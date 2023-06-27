'use client';

import { LikeButton } from '@/app/components/Generals';
import { MediaItem } from '@/app/components/Libraries';
import useOnPlay from '@/app/hooks/useOnPlay';
import { Song } from '@/app/types';

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                Không tìm thấy bài hát phù hợp!
            </div>
        );
    }
    return (
        <div className='flex flex-col gap-y-2 w-full px-6'>
            {songs.map((song) => (
                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default SearchContent;
