import StudyCard from './StudyCard'

interface Props {
    items: {
        id: string
        title: string
        description: string
        coverLabel?: string
        updatedAt: string
    }[]
}

export default function RecentStudyList({ items }: Props) {
    if (!items || items.length === 0) {
        return (
            <div className="min-h-60 bg-white rounded-2xl shadow-[0px_4px_4px_0px_#00000040] py-2 px-5 flex items-center justify-center">
                <p className='text-center text-2xl font-bold'>최근에 하신 공부가 없습니다.</p>
            </div>
        )
    }

    return (
        <div className=' min-h-60 bg-white rounded-2xl shadow-[0px_4px_4px_0px_#00000040] py-2 px-5'>
            <p className='text-base font-medium mb-4'>최근 공부로 돌아가기</p>
            <div >
                {items.map(item => (
                    <StudyCard key={item.id} item={item} />
                ))}
            </div>
        </div>

    )
}
