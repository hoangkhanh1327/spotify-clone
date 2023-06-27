import { create } from 'zustand';

interface PlayStore {
    ids: string[];
    activedId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: () => void;
}

const usePlayer = create<PlayStore>((set) => ({
    ids: [],
    activedId: undefined,
    setId: (id: string) => set({ activedId: id }),
    setIds: (ids: string[]) => set({ ids: ids }),
    reset: () => set({ ids: [], activedId: undefined }),
}));

export default usePlayer;
