// src/features/users/api/get-me.ts
import apiClient from '../../../shared/apiClient'

/** 스웨거 응답 래퍼 */
type ApiEnvelope<T> = {
    code: number
    status: string
    message: string
    data: T
}

/** 현재 사용자 데이터 */
export type UserMe = {
    name: string
    userType: string
}

const ACCESS_TOKEN_KEY = 'accessToken'

/**
 * - 성공: ApiEnvelope<{ name, userType }>
 * - 401: 인증 실패 -> Error('UNAUTHORIZED') throw
 */
export async function getCurrentUser(userId: number): Promise<UserMe> {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)

    try {
        const res = await apiClient.get<ApiEnvelope<UserMe>>('/api/v1/users/me', {
            params: { userId },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        return res.data.data
    } catch (err: any) {
        if (err?.response?.status === 401) {
            const e = new Error('UNAUTHORIZED') as Error & { status?: number }
            e.status = 401
            throw e
        }
        const e = new Error('USER_ME_REQUEST_FAILED') as Error & { cause?: unknown }
        e.cause = err
        throw e
    }
}
