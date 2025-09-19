export type SummaryItem = {
    id: string;
    title: string;
    status: 'processing' | 'ready';
    coverText?: string;
    pages: string[];
    createdAt: string;
};
