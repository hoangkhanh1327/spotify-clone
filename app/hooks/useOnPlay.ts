import { Song } from '@/app/types';
import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';
import useSubcribeModal from './useSubcribeModal';

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const subcribeModal = useSubcribeModal();

    const { user, subscription } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        // if (!subscription) {
        //     return subcribeModal.onOpen();
        // }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    };

    return onPlay;
};

export default useOnPlay;
