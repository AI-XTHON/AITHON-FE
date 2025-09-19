// features/upload/components/DataCardList.tsx
import { memo } from "react";
import type { SummaryItem } from "../data";
import { PostCard } from "./PostCard";

type Props = { items: SummaryItem[] };

function PostCardListBase({ items }: Props) {
    return (
        <>
            {items.map((it) => (
                <PostCard key={it.id} item={it} />
            ))}
        </>
    );
}

export default memo(PostCardListBase);
