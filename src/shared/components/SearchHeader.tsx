import { useState, type FormEvent } from 'react';
import search from '../assets/search.svg';

type Props = {
    placeholder?: string;
    onSearch?: (value: string) => void;
};

export default function SearchHeader({ placeholder, onSearch }: Props) {
    const [value, setValue] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch?.(value);
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex items-center px-7">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-full bg-white p-3 pl-5 pr-12 shadow-[0px_4px_4px_0px_#00000040]"
            />
            <button
                type="submit"
                aria-label="검색하기"
                className="absolute right-10 top-1/2 -translate-y-1/2"
            >
                <img src={search} alt="" />
            </button>
        </form>
    );
}