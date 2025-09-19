import { useCallback, useEffect, useState } from 'react'
import { getCurrentUser, type UserMe } from '../api/api-me'
import { useNavigate } from 'react-router-dom'
import BottomBar from '../../../shared/components/BottomBar'
import MypageHeader from '../components/MypageHeader'
import ProfileSection from '../components/ProfileSection'
import MenuSection from '../components/MenuSection'
import { logout } from '../utils/logout'

export default function Mypage() {
    const [me, setMe] = useState<UserMe | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        let alive = true
        setLoading(true)
        setError(null)
        getCurrentUser()
            .then((data: UserMe) => {
                if (alive) setMe(data)
            })
            .catch((e: any) => {
                if (!alive) return
                if (e?.status === 401) {
                    navigate('/login', { replace: true })
                    return
                }
                setError(e as Error)
            })
            .finally(() => { if (alive) setLoading(false) })
        return () => { alive = false }
        // 주석: useEffect 의존성 배열에서 userId를 제거합니다.
    }, [navigate])

    const nickname = me?.name ?? '닉네임'
    const position = me?.userType ?? '대학생'

    const handleSettings = useCallback(() => {
        // TODO: 설정 페이지로 이동하는 로직 구현
    }, [])

    const handleLogout = useCallback(async () => {
        await logout()
        navigate('/login', { replace: true })
    }, [navigate])

    return (
        <div>
            <MypageHeader onSettingsClick={handleSettings} />
            <main className="bg-white">
                {loading && <p>불러오는 중</p>}
                {error && <p>오류: {error.message}</p>}

                {/* 주석: me가 null이 아닐 때만 프로필과 메뉴를 렌더링하도록 조건부 렌더링 추가 */}
                {me && !loading && !error && (
                    <>
                        <ProfileSection nickname={nickname} position={position} />
                        <MenuSection onLogout={handleLogout} />
                    </>
                )}
            </main>
            <BottomBar />
        </div>
    )
}