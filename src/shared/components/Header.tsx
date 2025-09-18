import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/left-arrow.svg';

interface HeaderProps {
    title?: string;
}
/** 타이틀 받는 뒤로가기 헤더 */
export default function Header({ title }: HeaderProps) {
    const navigate = useNavigate();

    const onClickBackHandler = () => {
        navigate(-1);
    };

    return (
        <header className='relative flex items-center px-6 pt-10 pb-6'>
            <button onClick={onClickBackHandler} aria-label="뒤로 가기">
                <img src={leftArrow} alt="" />
            </button>
            <h1 className="absolute left-2/5 text-2xl font-medium text-[#676767]">{title}</h1>
            <div />
        </header>
    );
}