import { NavLink } from "react-router-dom";
import home from '../assets/home.svg'
import menu from '../assets/menu.svg'
import quiz from '../assets/quiz.svg'
import upload from '../assets/upload.svg'
import toggleHome from '../assets/toggle-home.svg'
import toggleMenu from '../assets/toggle-menu.svg'
import toggleQuiz from '../assets/toggle-quiz.svg'
import toggleUpload from '../assets/toggle-upload.svg'
import { useState } from "react";

type BottomBarItemProps = {
    to: string;
    icon: string;
    toggleIcon: string;
    label : string;
}

/** 바텀 바 아이템 */
function BottomBarItem({ to, icon, toggleIcon, label }: BottomBarItemProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    return (
        <NavLink
            to={to}
            className="flex items-center gap-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsClicked((prev) => !prev)}
        >
            {({ isActive }) => {
                const showToggle = isActive || isHovered || isClicked;
                return (
                    <div className=" cursor-point flex flex-col items-center">
                        <img src={showToggle ? toggleIcon : icon} alt={label} className="h-[40px] w-[40px] mb-2"/>
                        <p className={`text-xs  font-medium text-center ${showToggle ? 'text-[#F15A24]' : 'text-black'}`}>{label}</p>
                    </div>
                );
            }}
        </NavLink>
    );
}

export default function BottomBar() {
    return (
        <nav className="flex rounded-t-2xl bg-white py-5 absolute bottom-0 w-full justify-around">
            <BottomBarItem to="/" icon={home} toggleIcon={toggleHome} label="홈" />
            <BottomBarItem to="/upload" icon={upload} toggleIcon={toggleUpload} label="자료 업로드" />
            <BottomBarItem to="/quiz" icon={quiz} toggleIcon={toggleQuiz} label="퀴즈" />
            <BottomBarItem to="/mypage" icon={menu} toggleIcon={toggleMenu} label="전체 메뉴" />
        </nav>
    );
}