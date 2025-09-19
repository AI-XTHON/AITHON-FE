import apiClient from "../../../shared/apiClient";

/** PATCH /api/v1/users/me 요청 스키마 */
export type UpdateMeRequest = {
    job: string;        // 예: "대학생/대학원생"
    ageGroup: string;   // 예: "20대"
    purpose: string;    // 예: "학교 시험 공부,자격증 공부"  
    nickname: string;   // 예: "홍길동"
};

/** UI 상태 → 서버 요청 매핑(간단) */
export function map_form_to_update(params: {
    occupation: string;
    ageRange: string;
    purposes: string[];
    nickname?: string;
}): UpdateMeRequest {
    return {
        job: params.occupation,
        ageGroup: params.ageRange,
        purpose: (params.purposes ?? []).join(","),
        nickname: params.nickname ?? "",
    };
}

/** 회원 정보 수정 */
export async function patch_users_me(req: UpdateMeRequest): Promise<void> {
    await apiClient.patch("/api/v1/users/me", req);

    // 서버가 query 파라미터만 받는 경우 아래로 교체:
    // await api_client.patch("/api/v1/users/me", null, { params: req });
}
