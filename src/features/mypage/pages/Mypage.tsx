import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomBar from '../../../shared/components/BottomBar'
import MypageHeader from '../components/MypageHeader'
import ProfileSection from '../components/ProfileSection'
import MenuSection from '../components/MenuSection'
import { logout } from '../utils/logout'

type Props = {
    nickname?: string
    position?: string
    redirectAfterLogoutPath?: string
}

export default function Mypage({
    nickname: nicknameProp,
    position: positionProp,
    redirectAfterLogoutPath = '/',
}: Props) {
    const navigate = useNavigate()

    // 로그인 연동 전이므로 기본값 제공 -> API 연동으로 바꿀 예정
    const nickname = useMemo(() => nicknameProp ?? '닉네임', [nicknameProp])
    const position = useMemo(() => positionProp ?? '대학생', [positionProp])

    const handleSettings = useCallback(() => {
        // TODO: 설정 화면 라우팅
    }, [])

    const handleLogout = useCallback(async () => {
        await logout()
        navigate(redirectAfterLogoutPath, { replace: true })
    }, [navigate, redirectAfterLogoutPath])

    return (
        <div>
            <MypageHeader onSettingsClick={handleSettings} />
            <main className="bg-white">
                <ProfileSection nickname={nickname} position={position} />
                <MenuSection onLogout={handleLogout} />
            </main>
            <BottomBar />
        </div>
    )
}
