import { useState } from 'react';
import { useRouter } from 'next/navigation';
import uniqid from 'uniqid';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/app/hooks/useUser';
import useUploadModal from '@/app/hooks/useUploadModal';
import Modal from './Modal';
import { Input } from '../Form';
import { Button } from '../Generals';
import { generateSlug } from '@/app/helpers/functionals';

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onClose } = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        },
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values?.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Vui lòng nhập đủ thông tin!');
                return;
            }

            const uniqueID = uniqid();

            // Upload the song
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from('songs')
                    .upload(
                        `song-${generateSlug(values.title)}-${uniqueID}`,
                        songFile,
                        {
                            cacheControl: '3600',
                            upsert: false,
                        }
                    );

            if (songError) {
                setIsLoading(false);
                return toast.error('Tải bài hát thất bại!');
            }

            // Upload the image
            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from('images')
                    .upload(
                        `image-${generateSlug(values.title)}-${uniqueID}`,
                        imageFile,
                        {
                            cacheControl: '3600',
                            upsert: false,
                        }
                    );

            if (imageError) {
                setIsLoading(false);
                return toast.error('Tải hình ảnh thất bại!');
            }

            const { error: supabaseError } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Thêm mới bài hát thành công');
            reset();
            onClose();
        } catch (error) {
            toast.error('Đã có lỗi xảy ra!' + error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title='Thêm bài hát mới'
            description='Tải lên bài hát của bạn'
            isOpen={isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-y-4'
            >
                <Input
                    id='title'
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder='Tên bài hát'
                />
                <Input
                    id='author'
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder='Tên tác giả'
                />
                <div>
                    <div className='pb-1'>Chọn file tải lên</div>
                    <Input
                        id='song'
                        type='file'
                        accept='.mp3'
                        disabled={isLoading}
                        {...register('song', { required: true })}
                        placeholder='Tên tác giả'
                    />
                </div>
                <div>
                    <div className='pb-1'>Chọn file tải lên</div>
                    <Input
                        id='image'
                        type='file'
                        accept='image/*'
                        disabled={isLoading}
                        {...register('image', { required: true })}
                        placeholder='Tên tác giả'
                    />
                </div>
                <Button disabled={isLoading} type='submit'>
                    Thêm bài hát mới
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;
