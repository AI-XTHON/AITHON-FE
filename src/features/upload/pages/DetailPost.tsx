import { useCallback, useMemo, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../../../shared/components/Header";

type SummaryFive = {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
    fifth?: string;
};

type DetailItem = {
    id: string;
    title?: string;
    pages?: string[];
    summary?: SummaryFive;
    createdAt?: string;
};

export default function DetailPost() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const item: DetailItem = useMemo(() => {
        const stateItem = (location.state as any)?.item as DetailItem | undefined;
        return (
            stateItem ?? {
                id: id ?? "",
                pages: [],
                summary: {},
            }
        );
    }, [id, location.state]);

    const [pageIndex, setPageIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    const pageCount = Math.max(1, item?.pages?.length ?? 1);
    const maxIndex = pageCount - 1;

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

    const summary = item.summary ?? {};

    return (
        <div>
            <Header title={`${pageIndex + 1} / ${pageCount}`} />
            <div className="mt-6 flex justify-center">
                <div
                    className="w-11/12 h-[70vh] bg-white rounded-2xl shadow flex items-center justify-center"
                    onClick={handleClick}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* 타이틀 5줄 요약(무조건 5줄 유지, summary.first..fifth) */}
                    <div className="w-full h-full p-4">
                        <div>{summary.first ?? ""}</div>
                        <div>{summary.second ?? ""}</div>
                        <div>{summary.third ?? ""}</div>
                        <div>{summary.fourth ?? ""}</div>
                        <div>{summary.fifth ?? ""}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
