'use client';

import { useRouter } from 'next/navigation';
import { Song } from '@/types';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { MediaItem } from '@/components/Libraries';
import { LikeButton } from '@/components/Generals';
import useOnPlay from '@/hooks/useOnPlay';

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
    const onPlay = useOnPlay(songs);
    const router = useRouter();
    const { isLoading, user } = useUser();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-600'>
                Không có bài hát yêu thích.
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-y-2 w-full p-6'>
            {songs.map((song) => (
                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                        <MediaItem
                            data={song}
                            onClick={(id: string) => onPlay(id)}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default LikedContent;
