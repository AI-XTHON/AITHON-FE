// 간단한 더미데이터
export const mockStudies = [
    {
        id: 'mock-1',
        title: '요약',
        description: '요약된 내용들',
        coverLabel: '표지',
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'mock-2',
        title: '요약 2',
        description: '더미 설명',
        coverLabel: '표지',
        updatedAt: new Date(Date.now() - 3600_000).toISOString(),
    },
]
