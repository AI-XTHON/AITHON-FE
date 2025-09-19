import { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../shared/components/Header";
import { dataStore } from "../data";

export default function DetailPost() {
    const { id } = useParams<{ id: string }>();
    const item = useMemo(() => (id ? dataStore.getById(id) : undefined), [id]);
    const [pageIndex, setPageIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

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

    return (
        <div>
            <Header />
            <div className="mt-6 flex justify-center">
                <div
                    className="w-11/12 h-[70vh] bg-white rounded-2xl flex items-center justify-center shadow-[0px_4px_4px_0px_#00000040]"
                    onClick={handleClick}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {!item || item.status === 'processing' ? (
                        <span className="text-xl">요약중...</span>
                    ) : (
                        <div className="w-full h-full p-4">
                            <div className="text-lg">{item.pages[pageIndex]}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
