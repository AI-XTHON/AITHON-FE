import { memo } from 'react'
import settingIcon from '../assets/setting.svg'

type Props = { onSettingsClick?: () => void }

function MypageHeader({ onSettingsClick }: Props) {
    return (
        <header className="flex justify-between py-8 px-6">
            <p className=' font-bold text-2xl'>전체 메뉴</p>
            <img src={settingIcon} alt="설정" onClick={onSettingsClick} />
        </header>
    )
}

export default memo(MypageHeader)
