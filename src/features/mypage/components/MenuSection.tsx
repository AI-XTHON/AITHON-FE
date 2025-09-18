import { memo } from 'react'
import { Link } from 'react-router-dom'

type Props = { onLogout: () => void }

function MenuSection({ onLogout }: Props) {
    return (
        <section>
            <div>
                <p>최근 내역 보기</p>
                <Link to="/quizzes/recent">최근에 생성된 퀴즈</Link> {/* TODO : 더미 경로 */}
                <Link to="/files/recent">최근에 추가된 파일</Link>   {/* TODO : 더미 경로 */}
            </div>

            <div>
                <p>수정하기</p>
                <Link to="/materials/edit">자료 수정하기</Link>     {/* TODO : 더미 경로 */}
            </div>

            <button onClick={onLogout}>로그아웃하기</button>
        </section>
    )
}

export default memo(MenuSection)
