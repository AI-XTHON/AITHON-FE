import apiClient from "../../../shared/apiClient";

export type Onboard_request = {
    job: string;        // 예: "대학생/대학원생"
    ageGroup: string;   // 예: "20대"
    purpose: string;    // 예: "학교 시험 공부,자격증 공부"
};

/** UI 상태 → 스웨거 요청 매핑 유틸(간단) */
export function map_form_to_onboard(params: {
    occupation: string;
    ageRange: string;
    purposes: string[]; // 다중 선택
}): Onboard_request {
    return {
        job: params.occupation,
        ageGroup: params.ageRange,
        purpose: params.purposes.join(","),
    };
}

/**
 * 회원 온보딩 설정
 * 성공 시 200. 실패 시 400(유효성), 401(인증) 등 ApiError throw.
 *
 */
export async function post_users_onboard(req: Onboard_request): Promise<void> {
    await apiClient.post("/api/v1/users/onboard", req);
}
