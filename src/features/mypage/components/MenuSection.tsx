import { memo } from 'react'
import { Link } from 'react-router-dom'

type Props = { onLogout: () => void }

function MenuSection({ onLogout }: Props) {
    return (
        <section className='bg-[#d7dbdc] '>
            <div className='p-7 flex flex-col gap-3'>
                <p className='text-[#717E82] text-xs'>최근 내역 보기</p>
                <Link to="/quizzes/recent" className='menuLinkText'>최근에 생성된 퀴즈</Link> {/* TODO : 더미 경로 */}
                <Link to="/files/recent" className='menuLinkText'>최근에 추가된 파일</Link>   {/* TODO : 더미 경로 */}
            </div>
            <hr className='text-[#717E82]' />
            <div className='p-7 flex flex-col gap-3'>
                <p className='text-[#717E82] text-xs'>수정하기</p>
                <Link to="/materials/edit" className='menuLinkText'>자료 수정하기</Link>     {/* TODO : 더미 경로 */}
            </div>
            <hr className='text-[#717E82]' />
            <button onClick={onLogout} className='p-7 text-[#FF0000] menuLinkText'>로그아웃하기</button>
        </section>
    )
}

export default memo(MenuSection)
