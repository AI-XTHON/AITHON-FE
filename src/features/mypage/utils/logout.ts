export const ACCESS_TOKEN_KEY = 'accessToken'

/** 로그아웃 유틸 서버 우선 요청 -> 불가능할 경우 로컬 토큰 제거 */
export async function logout(): Promise<void> {
    try {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        sessionStorage.removeItem(ACCESS_TOKEN_KEY) // 혹시 세션에 저장하는 경우 대비
        window.location.href = '/login' // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch {
        // 서버 오류는 무시하고 로컬 토큰 제거를 계속 진행
    } finally {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        sessionStorage.removeItem(ACCESS_TOKEN_KEY) // 혹시 세션에 저장하는 경우 대비
        window.location.href = '/login' // 로그아웃 후 로그인 페이지로 리다이렉트
    }
}
