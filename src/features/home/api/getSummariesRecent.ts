import apiClient, { retryRequest } from '../../../shared/apiClient';

export interface SummaryRecentDto {
    thumpNail: string; // 스펙 그대로(오탈자 포함)
    summary: string;
    oneLiner: string;
}

/**
 * GET /api/v1/summaries/recent
 * - 응답: 단일 객체
 * - shared/apiClient 인터셉터(401 재발급/재시도) 그대로 활용
 */
export async function getSummaries(): Promise<SummaryRecentDto> {
    const res = await retryRequest(() =>
        apiClient.get<SummaryRecentDto>('/api/v1/summaries/recent')
    );
    return res.data;
}