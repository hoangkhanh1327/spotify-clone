import {
    ModalProvider,
    SupabaseProvider,
    ToasterProvider,
    UserProvider,
} from '@/providers';
import { Sidebar } from '../components/Generals';
import './globals.css';
import { Figtree } from 'next/font/google';
import getSongsByUserId from '@/actions/getSongsByUserId';
import { Player } from '@/components/Player';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
    title: 'Assistant',
    description: 'Happy Listening',
};

export const revalidate = 0;

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userSongs = await getSongsByUserId();
    return (
        <html lang='en'>
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <Sidebar songs={userSongs}>{children}</Sidebar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
