import apiClient, { retryRequest } from '../../../shared/apiClient';

export interface SummaryDto {
    thumpNail: string;
    summary: string;
    oneLiner: string;
}

/**
 * GET /api/v1/summaries
 * - shared/apiClient의 인터셉터(토큰/재발급/재시도)를 그대로 활용
 * - 서버가 단일 객체를 주는 상황도 방어적으로 배열로 정규화
 */
export async function getSummaries(): Promise<SummaryDto[]> {
    const res = await retryRequest(() =>
        apiClient.get<SummaryDto[] | SummaryDto>('/api/v1/summaries', {

        })
    );

    const data = res.data as any;
    return Array.isArray(data) ? data : [data];
}
