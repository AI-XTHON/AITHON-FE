import { Link } from 'react-router-dom'

interface StudyItem {
    id: string
    title: string
    description: string
    coverLabel?: string
    updatedAt: string
}

export default function StudyCard({ item }: { item: StudyItem }) {
    return (
        <Link to={`/studies/${item.id}`} className='flex gap-4 mb-4'>
            {/* 이거 이미지로 바뀔 수도? */}
            <div className="px-10 py-5 bg-[#D9D9D9]">{item.coverLabel ?? '표지'}</div>
            <div>
                <h4 className="text-base">{item.title}</h4>
                <p className="text-xs">{item.description}</p>
            </div>
        </Link>
    )
}
