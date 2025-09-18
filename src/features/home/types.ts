export interface StudyItem {
    id: string;
    title: string;       // "요약"
    description: string; // "요약된 내용들"
    coverLabel?: string; // "표지"
    updatedAt: string;   // ISO string
}
