'use client';

import { Button } from '@/app/components/Generals';
import { postData } from '@/helpers/helpers';
import useSubcribeModal from '@/app/hooks/useSubcribeModal';
import { useUser } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface AccountContentProps {}

const AccountContent: React.FC<AccountContentProps> = ({}) => {
    const router = useRouter();
    const subcribeModal = useSubcribeModal();
    const { isLoading, subscription, user } = useUser();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link',
            });
            window.location.assign(url);
        } catch (error) {
            if (error) {
                toast.error((error as Error)?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mb-7 px-6'>
            {!subscription && (
                <div className='flex flex-col gap-y-4'>
                    <p className=''>Bạn chưa đăng ký gói nào.</p>
                    <Button
                        onClick={subcribeModal.onOpen}
                        className='w-[300px]'
                    >
                        Đăng ký
                    </Button>
                </div>
            )}
            {subscription && (
                <div className='flex flex-col gap-y-4'>
                    <p>Gói Spotify Premium của bạn đang được kích hoạt.</p>
                    <Button
                        onClick={redirectToCustomerPortal}
                        className='w-[300px]'
                        disabled={loading || isLoading}
                    >
                        Xem thông tin thanh toán
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AccountContent;
