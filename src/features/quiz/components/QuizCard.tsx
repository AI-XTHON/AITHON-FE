import { memo } from "react";
import type { QuizItem } from "../types";

type Props = {
    item: QuizItem;
    onSelect?: (id: string) => void;
};

function QuizCardBase({ item, onSelect }: Props) {
    return (
        <button type="button" onClick={() => onSelect?.(item.id)}
            className="w-full text-left text-lg bg-white p-3 font-semibold mb-4">
            {item.title}
        </button>
    );
}

const QuizCard = memo(QuizCardBase);
export default QuizCard;
