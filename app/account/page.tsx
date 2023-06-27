import { SearchInput } from '@/app/components/Form';
import { Header } from '@/app/components/Generals';
import AccountContent from './components/AccountContent';

interface AccountProps {
    searchParams: {
        title: string;
    };
}

export const revalidate = 0;

const Account = async ({ searchParams }: AccountProps) => {
    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
            <Header className='from-bg-neutral-900'>
                <div className='mb-2 flex flex-col gap-y-6'>
                    <h1 className='text-white text-3xl font-semibold'>
                        Tài khoản
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
    );
};

export default Account;
