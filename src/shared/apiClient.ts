import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// 환경 변수 및 상수 설정 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_TIME_OUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000);
const API_RETRY_COUNT = Number(import.meta.env.VITE_API_RETRY_COUNT ?? 3);

// 토큰 관리를 위한 키와 헬퍼 함수들을 추가
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIME_OUT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: false,
});

// 5xx 에러 재시도 함수 
export const retryRequest = async <T>(
    fn: () => Promise<T>,
    retries: number = API_RETRY_COUNT
): Promise<T> => {
    try {
        return await fn();
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (
                retries > 0 &&
                error.response?.status !== undefined &&
                error.response.status >= 500
            ) {
                await new Promise<void>((resolve) => setTimeout(resolve, 1000));
                return retryRequest(fn, retries - 1);
            }
        }
        console.error("Unexpected error:", error);
        throw error;
    }
};

// 기존 요청 인터셉터
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig & { authRequired?: boolean }) => {
        const token = getAccessToken();
        const needAuth = config.authRequired ?? true;
        if (needAuth && token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// 401 에러 처리를 위한 응답 추가 
apiClient.interceptors.response.use(
    (response) => response, // 성공 응답은 그대로 통과
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

        // 401 에러가 아니거나, 재시도 횟수를 초과했거나, 토큰 갱신 요청 자체에서 발생한 에러는 처리하지 않음
        if (error.response?.status !== 401 || (originalRequest._retryCount ?? 0) >= API_RETRY_COUNT || originalRequest.url === "/api/v1/auth/reissue") {
            return Promise.reject(error);
        }

        originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

        try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                console.error("No refresh token available.");
                // 로그인 페이지로 리디렉션 로직
                return Promise.reject(error);
            }

            // 토큰 갱신 API 호출
            const reissueResponse = await apiClient.post(
                "/api/v1/auth/reissue",
                {},
                { headers: { "X-Refresh-Token": refreshToken } }
            );

            // 새로 발급받은 토큰 저장
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = reissueResponse.data.data;
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);

            // 원본 요청 헤더에 새 토큰 설정
            if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            // 새 토큰으로 원본 요청 다시 실행
            return apiClient(originalRequest);

        } catch (reissueError) {
            console.error("Failed to reissue token", reissueError);
            // 토큰 갱신 실패 시 모든 토큰 삭제 및 로그인 페이지로 리디렉션
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            window.location.href = '/login';
            alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
            return Promise.reject(reissueError);
        }
    }
);

export default apiClient;