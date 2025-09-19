import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../shared/components/Header";

type SummaryItem = {
    id: string;
    status: 'processing' | 'completed';
    pages: string[];
    title: string; // Header에 제목을 표시하기 위해 추가
};

async function getById(id: string): Promise<SummaryItem | undefined> {
    console.log(`Fetching data for id: ${id}`);
    return undefined;
}

export default function DetailPost() {
    const { id } = useParams<{ id: string }>();

    // 주석: item과 로딩 상태를 관리하기 위한 state를 추가합니다.
    const [item, setItem] = useState<SummaryItem | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const [pageIndex, setPageIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    // 주석: 데이터 fetching을 위해 useEffect를 사용합니다. id가 변경될 때마다 다시 실행됩니다.
    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedItem = await getById(id);
                setItem(fetchedItem);
            } catch (error) {
                console.error("Failed to fetch item:", error);
                setItem(undefined); // 에러 발생 시 item을 비웁니다.
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const maxIndex = Math.max(0, (item?.pages.length ?? 1) - 1);

    const goPrev = useCallback(() => {
        setPageIndex((p) => Math.max(0, p - 1));
    }, []);
    const goNext = useCallback(() => {
        setPageIndex((p) => Math.min(maxIndex, p + 1));
    }, [maxIndex]);

    const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
        const { left, width } = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = e.clientX - left;
        if (x < width / 2) goPrev(); else goNext();
    }, [goPrev, goNext]);

    const onTouchStart = useCallback<React.TouchEventHandler<HTMLDivElement>>((e) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);
    const onTouchEnd = useCallback<React.TouchEventHandler<HTMLDivElement>>((e) => {
        if (touchStartX.current == null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) < 40) return;
        if (delta > 0) goPrev(); else goNext();
    }, [goPrev, goNext]);

    // 주석: 로딩 및 데이터 유무에 따른 UI 분기 처리
    const renderContent = () => {
        if (loading) {
            return <span className="text-xl">불러오는 중...</span>;
        }
        if (!item) {
            return <span className="text-xl">요약 정보를 찾을 수 없습니다.</span>;
        }
        if (item.status === 'processing') {
            return <span className="text-xl">요약중...</span>;
        }
        return (
            <div className="w-full h-full p-4 overflow-y-auto">
                <div className="text-lg whitespace-pre-wrap">{item.pages[pageIndex]}</div>
            </div>
        );
    };

    return (
        <div>
            <Header title={item?.title} />
            <div className="mt-6 flex justify-center">
                <div
                    className="w-11/12 h-[70vh] bg-white rounded-2xl flex items-center justify-center shadow-[0px_4px_4px_0px_#00000040]"
                    onClick={handleClick}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}