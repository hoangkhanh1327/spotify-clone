import {
    ModalProvider,
    SupabaseProvider,
    ToasterProvider,
    UserProvider,
} from '@/app/providers';
import { Sidebar } from '@/app/components/Generals';
import './globals.css';
import { Figtree } from 'next/font/google';
import getSongsByUserId from '@/app/actions/getSongsByUserId';
import { Player } from '@/app/components/Player';
import getActiveProductsPrices from '@/app/actions/getActiveProductsPrices';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
    title: 'K-Music',
    description: 'Happy Listening',
};

export const revalidate = 0;

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userSongs = await getSongsByUserId();
    const products = await getActiveProductsPrices();

    return (
        <html lang='en'>
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider products={products} />
                        <Sidebar songs={userSongs}>{children}</Sidebar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
