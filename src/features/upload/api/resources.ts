import apiClient, { retryRequest } from "../../../shared/apiClient";
import type { AxiosResponse } from "axios";

export type UploadResourceResponse =
    | { id: string }
    | Record<string, unknown>;

export async function uploadResource(file: File, title: string): Promise<UploadResourceResponse> {
    const form = new FormData();
    form.append("file", file);
    // form.append("title", title);
    form.append(
        "request",
        new Blob([JSON.stringify({ title })], { type: "application/json" })
    );

    const call = () =>
        apiClient
            .post<UploadResourceResponse, AxiosResponse<UploadResourceResponse>>(
                "/api/v1/resources",
                form,
                {
                    headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
                    transformRequest: (v) => v,
                    responseType: "json",
                    timeoutErrorMessage: "업로드 요청이 시간 초과되었습니다.",
                }
            )
            .then((r) => r.data as UploadResourceResponse);

    const data = await retryRequest<UploadResourceResponse>(call);

    if (typeof data === "string") return { id: data };
    return data;
}
