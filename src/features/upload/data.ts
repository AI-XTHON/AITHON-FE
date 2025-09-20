export type SummaryItem = {
    id: string;
    title: string;
    status: 'processing' | 'ready';
    coverText?: string;
    pages: string[];
    createdAt: string;
};

let items: SummaryItem[] = [
    {
        id: 'd1',
        title: '제목',
        status: 'ready',
        coverText: '표지 or 첫페이지',
        pages: ['1장', '2장', '3장'],
        createdAt: new Date().toISOString(),
    },
    {
        id: 'd2',
        title: '요약중 샘플',
        status: 'processing',
        coverText: '요약중...',
        pages: [],
        createdAt: new Date().toISOString(),
    },
];

export const dataStore = {
    getAll(): SummaryItem[] {
        return items;
    },
    getById(id: string): SummaryItem | undefined {
        return items.find((it) => it.id === id);
    },
    add(newItem: SummaryItem) {
        items = [newItem, ...items];
    },
    update(id: string, patch: Partial<SummaryItem>) {
        items = items.map((it) => (it.id === id ? { ...it, ...patch } : it));
    },
};