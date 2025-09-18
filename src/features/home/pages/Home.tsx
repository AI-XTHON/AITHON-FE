// src/features/home/Home.tsx
import profileIcon from '../assets/profile.svg'
import clip from '../assets/clip.svg'
import camera from '../assets/camera.svg'
import msg from '../assets/msg.svg'
import { Link, useNavigate } from 'react-router-dom'
import BottomBar from '../../../shared/components/BottomBar'
import '../style.css'

// 더미데이터 및 리스트 컴포넌트
import { mockStudies } from '../mock'
import RecentStudyList from "../components/RecentStudyList"
import { useCallback } from 'react'

export default function Home() {
    // [added] 더미 데이터(빈 상태 테스트 시 빈 배열로 교체)
    const recentStudies = mockStudies
    const navigate = useNavigate();
    const onClick = useCallback(() => navigate('/profile'), [navigate]);

    return (
        <div>
            <div className='p-7'>
                <header className='mb-30'>
                    <button type="button" className="p-3 bg-[#9F9F9F] rounded-full" onClick={onClick} aria-label="프로필로 이동">
                        <img src={profileIcon} alt="" />
                    </button>
                </header>

                <main>
                    <p className='text-2xl font-semibold mb-2'>무엇이든 물어봐주세요.</p>
                    <div className='flex items-center gap-2'>
                        {/* TODO : chat Link */}
                        <Link to='/'><span className='py-4 pl-6 pr-28 bg-white rounded-full w-20 text-[#626262]'>내용을 작성해주세요.</span></Link>
                        <Link to='/upload' className='linkItem'><img src={clip} alt="" /></Link>
                        <Link to='/' className='linkItem'><img src={camera} alt="" /></Link>
                    </div>

                    <div className=' relative mb-20'>
                        <img src={msg} alt="" className='absolute right-4' />
                        <p className='absolute right-9 top-7 text-xs'>강의 자료를 올려주세요.</p>
                    </div>

                    <div>
                        <RecentStudyList items={recentStudies} />
                    </div>
                </main>
            </div>
            <BottomBar />
        </div>
    )
}
