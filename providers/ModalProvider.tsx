'use client';

import { AuthModal } from '@/components/Modal';
import SubcribeModal from '@/components/Modal/SubcribeModal';
import UploadModal from '@/components/Modal/UploadModal';
import { ProductWithPrice } from '@/types';
import { useEffect, useState } from 'react';

interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
    const [isMounted, setIsMounted] = useState(false);

    // useEffect like a trick to ensure that modal only render in client side but not in server side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <AuthModal />
            <UploadModal />
            <SubcribeModal products={products} />
        </>
    );
};

export default ModalProvider;
