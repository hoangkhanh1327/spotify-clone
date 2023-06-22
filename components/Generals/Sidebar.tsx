'use client';

import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SidebarItem from './SidebarItem';
import { Library } from '../Libraries';
import { Song } from '@/types';
import usePlayer from '@/hooks/usePlayer';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}
const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
    const player = usePlayer();
    const pathname = usePathname();
    const routes = useMemo(() => {
        return [
            {
                icon: HiHome,
                label: 'Trang chủ',
                active: pathname !== '/search',
                href: '/',
            },
            {
                icon: BiSearch,
                label: 'Tìm kiếm',
                active: pathname === '/search',
                href: '/search',
            },
        ];
    }, [pathname]);

    return (
        <aside
            className={twMerge(
                `flex h-full`,
                player.activedId && 'h-[calc(100%_-_80px)]'
            )}
        >
            <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
                <Box>
                    <div className='flex flex-col gap-y-4 px-5 py-4'>
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <Library songs={songs} />
                </Box>
            </div>
            <main className='h-full flex-1 overflow-y-auto py-2'>
                {children}
            </main>
        </aside>
    );
};

export default Sidebar;
