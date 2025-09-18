import axios, { type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "localhost:8080";
const API_TIME_OUT = Number(import.meta.env.VITE_API_TIMEOUT ?? 10000); // TimeOut 시간
const API_RETRY_COUNT = Number(import.meta.env.VITE_API_RETRY_COUNT ?? 3); // 재시도 횟수

const ACCESS_TOKEN_KEY = "accessToken";

export function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? null;
}

/** 기본 API 호출 설정 - API 호출 시 공통적으로 사용할 설정을 정의 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIME_OUT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: false, // 쿠키 인증 안 쓰면 false가 안전
});

/**
 * API 요청 재시도 함수 - 네트워크 오류나 서버 오류(5xx) 발생 시 재시도
 *
 * @template T 요청 함수의 반환 타입
 * @param {() => Promise<T>} fn API 호출 함수
 * @param {number} retries 남은 재시도 횟수 (기본값: 3회)
 * @returns {Promise<T>} 요청 성공 시 반환되는 데이터
 * @throws {Error} 재시도 횟수를 초과하거나 예상치 못한 에러 발생 시
 */
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
        // 예상치 못한 에러 처리
        console.error("Unexpected error:", error);
        throw error;
    }
};

/** 요청 인터셉터 - 매 요청마다 Authorization 자동 첨부 */
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig & { authRequired?: boolean }) => {
        const token = getAccessToken();
        const needAuth = config.authRequired ?? true; // 기본은 true
        if (needAuth && token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }
);