'use client';

import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Button from './Button';
import useAuthModal from '@/app/hooks/useAuthModal';
import { useUser } from '@/app/hooks/useUser';
import { toast } from 'react-hot-toast';
import usePlayer from '@/app/hooks/usePlayer';
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter();
    const player = usePlayer();
    const authModal = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const { user, subscription } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Đăng xuất thành công!');
        }
    };

    return (
        <header
            className={twMerge(
                `h-fit bg-gradient-to-b from-emerald-800 p-6`,
                className
            )}
        >
            <div className='w-full mb-4 flex items-center justify-between'>
                <div className='hidden md:flex gap-x-2 items-center'>
                    <button
                        onClick={() => router.back()}
                        className='rounded-full bg-black flex items-center justify-between cursor-pointer hover:opacity-75 transition'
                    >
                        <RxCaretLeft size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className='rounded-full bg-black flex items-center justify-between cursor-pointer hover:opacity-75 transition'
                    >
                        <RxCaretRight size={35} />
                    </button>
                </div>
                <div className='flex md:hidden gap-x-2 items-center'>
                    <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                        <HiHome className='text-black' size={20} />
                    </button>
                    <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                        <BiSearch className='text-black' size={20} />
                    </button>
                </div>
                <div className='flex justify-between items-center gap-x-4'>
                    {user ? (
                        <div className='flex gap-x-4 items-center'>
                            <Button
                                onClick={handleLogout}
                                className='bg-white px-6 py-2 w-auto'
                            >
                                Đăng xuất
                            </Button>
                            <Button
                                onClick={() => router.push('/ca-nhan')}
                                className='bg-white w-auto'
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <Fragment>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className='bg-transparent text-neutral-300 font-medium'
                                >
                                    Đăng ký
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className='bg-white px-6 py-2'
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
            {children}
        </header>
    );
};

export default Header;
