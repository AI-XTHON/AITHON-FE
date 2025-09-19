import { useCallback, useEffect, useState } from 'react'
import { getCurrentUser, type UserMe } from '../api/api-me'
import { useNavigate } from 'react-router-dom'
import BottomBar from '../../../shared/components/BottomBar'
import MypageHeader from '../components/MypageHeader'
import ProfileSection from '../components/ProfileSection'
import MenuSection from '../components/MenuSection'
import { logout } from '../utils/logout'

export default function Mypage({ userId }: { userId: number }) {
    const [me, setMe] = useState<UserMe | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        let alive = true
        setLoading(true)
        setError(null)
        getCurrentUser(userId)
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
    }, [userId, navigate])

    const nickname = me?.name ?? '닉네임'
    const position = me?.userType ?? '대학생'

    const handleSettings = useCallback(() => {
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

                <ProfileSection nickname={nickname} position={position} />
                <MenuSection onLogout={handleLogout} />
            </main>
            <BottomBar />
        </div>
    )
}
