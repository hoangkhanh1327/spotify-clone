'use client';

import { AuthModal } from '@/app/components/Modal';
import SubcribeModal from '@/app/components/Modal/SubcribeModal';
import UploadModal from '@/app/components/Modal/UploadModal';
import { ProductWithPrice } from '@/app/types';
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
