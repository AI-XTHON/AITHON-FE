import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { SummaryItem } from "../data";


type Props = { item: SummaryItem };

function DataCardBase({ item }: Props) {
    const navigate = useNavigate();
    const handleClick = useCallback(() => {
        navigate(`/upload/${item.id}`); // DetailPost로 이동
    }, [navigate, item.id]);

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                onClick={handleClick}
                className="h-60 w-40 rounded-2xl bg-[#D9D9D9] shadow-[0px_4px_4px_0px_#00000040]"
            >
                <div className="w-full h-full flex items-center justify-center">
                    <span className="text-lg">
                        {item.status === "processing" ? "요약중..." : (item.coverText ?? "")}
                    </span>
                </div>
            </button>
            <span className="my-2">{item.title}</span>
        </div>
    );
}

export const PostCard = memo(DataCardBase);
