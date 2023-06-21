'use client';

import { AuthModal, Modal } from '@/app/components/Modal';
import UploadModal from '@/app/components/Modal/UploadModal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
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
        </>
    );
};

export default ModalProvider;
