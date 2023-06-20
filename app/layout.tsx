import { Sidebar } from './components/Generals';
import './globals.css';
import { Figtree } from 'next/font/google';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
    title: 'Assistant',
    description: 'Happy Working',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={font.className}>
                <Sidebar>{children}</Sidebar>
            </body>
        </html>
    );
}
