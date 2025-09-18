import { memo } from 'react'
import profile from '../assets/profile.svg'
import { Link } from 'react-router-dom'

type Props = {
    nickname: string
    position: string
}

function ProfileSection({ nickname, position }: Props) {
    return (
        <section className=' relative p-4 pr-10 bg-[#d7dbdc] flex justify-between mb-8'>
            <div className='flex gap-3'>
                <img src={profile} alt="프로필" className=' bg-[#9F9F9F] p-4 rounded-2xl' />
                <div className='p-1'>
                    <p className='font-bold text-sm mb-1'>{nickname}</p>
                    <p className='text-xs'>{position}</p>
                </div>
            </div>

            <Link to='/settings/user-info' className=' my-auto h-8 py-1 px-3 bg-[#F15A24]  text-white rounded-lg'>
                수정
            </Link>
        </section>
    )
}

export default memo(ProfileSection)
