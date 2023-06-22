'use client';

import { Prices, ProductWithPrice } from '@/types';
import Modal from './Modal';
import { Button } from '../Generals';
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { toast } from 'react-hot-toast';
import { postData } from '@/helpers/helpers';
import { getStripe } from '@/helpers/stripeClient';
import useSubcribeModal from '@/hooks/useSubcribeModal';

interface SubcribeModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Prices) => {
    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
    }).format(price?.unit_amount || 0);

    return priceString;
};

const SubcribeModal: React.FC<SubcribeModalProps> = ({ products }) => {
    const { user, isLoading, subscription } = useUser();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const subcribeModal = useSubcribeModal();

    const onChange = (open: boolean) => {
        if (!open) {
            subcribeModal.onClose();
        }
    };

    const handleCheckout = async (price: Prices) => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Vui lòng đăng nhập!');
        }

        if (subscription) {
            setPriceIdLoading(undefined);
            return toast('Bạn đã đăng ký gói dịch vụ Premium.');
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: {
                    price,
                },
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };

    let content = <div className='text-center'>No products available.</div>;

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return <div key={product.id}>No prices available.</div>;
                    }

                    return product.prices.map((price) => (
                        <Button
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className='mb-4'
                        >
                            {`Đăng ký ngay với mức giá ${formatPrice(
                                price
                            )} / ${price.interval === 'month' ? 'tháng' : ''}`}
                        </Button>
                    ));
                })}
            </div>
        );
    }

    if (subscription) {
        content = (
            <div className='text-center'>
                Bạn đã đăng ký gói Spotify Premium.
            </div>
        );
    }

    return (
        <Modal
            title='Đăng ký Spotify Premium'
            description='Tận hưởng âm nhạc với Spotify Premium'
            isOpen={subcribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    );
};

export default SubcribeModal;
