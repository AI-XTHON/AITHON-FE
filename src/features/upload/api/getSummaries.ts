import apiClient, { retryRequest } from "../../../shared/apiClient";
import type { AxiosResponse } from "axios";

export type SummaryListItem = {
    id?: string;
    title?: string;
    thumbnail?: string;
    summary?: string;
    oneliner?: string;
    createdAt?: string;
};

export async function getSummaries(): Promise<SummaryListItem[]> {
    const call = () =>
        apiClient
            .get<SummaryListItem[], AxiosResponse<SummaryListItem[]>>(
                "/api/v1/summaries",
                { responseType: "json", headers: { Accept: "*/*" } }
            )
            .then((r) => r.data);

    return retryRequest(call);
}
