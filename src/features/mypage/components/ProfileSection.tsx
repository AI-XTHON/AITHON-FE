import { memo } from 'react'
import profile from '../assets/profile.svg'
import { Link } from 'react-router-dom'

type Props = {
    nickname: string
    position: string
}

function ProfileSection({ nickname, position }: Props) {
    return (
        <section>
            <img src={profile} alt="프로필" />
            <div>
                <p>{nickname}</p>
                <p>{position}</p>
            </div>
            <Link to='/settings/user-info'>
                수정
            </Link>
        </section>
    )
}

export default memo(ProfileSection)
