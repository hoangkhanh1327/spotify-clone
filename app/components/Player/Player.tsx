'use client';

import useGetSongById from '@/app/hooks/useGetSongById';
import useLoadSongUrl from '@/app/hooks/useLoadSongUrl';
import usePlayer from '@/app/hooks/usePlayer';
import PlayerContent from './PlayerContent';

interface PlayerProps {}

const Player: React.FC<PlayerProps> = ({}) => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activedId);

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activedId) {
        return null;
    }

    return (
        <div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
            {/* Use Key Will Destroy The Lastest PlayerContent When Play Next Song To Refresh State */}
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
};

export default Player;
