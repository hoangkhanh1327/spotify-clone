'use client';

import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import qs from 'query-string';
import Input from './Input';

interface SearchInputProps {}
const SearchInput: React.FC<SearchInputProps> = ({}) => {
    const router = useRouter();
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            q: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/tim-kiem',
            query: query,
        });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <div>
            <Input
                placeholder='Tên bài hát bạn muốn nghe ...'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export default SearchInput;
