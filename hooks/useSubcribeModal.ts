import { create } from 'zustand';

interface SubcribeModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSubcribeModal = create<SubcribeModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSubcribeModal;
