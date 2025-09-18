import apiClient from '../../../shared/apiClient'

export const ACCESS_TOKEN_KEY = 'accessToken'

/** 로그아웃 유틸 서버 우선 요청 -> 불가능할 경우 로컬 토큰 제거 */
export async function logout(): Promise<void> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    try {
        if (token) {
            await apiClient.post(
                '/auth/logout',      // 프로젝트 엔드포인트에 맞게 수정 가능
                null,
                { headers: { Authorization: `Bearer ${token}` } }
            )
        }
    } catch {
        // 서버 오류는 무시하고 로컬 토큰 제거를 계속 진행
    } finally {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        sessionStorage.removeItem(ACCESS_TOKEN_KEY) // 혹시 세션에 저장하는 경우 대비
    }
}
