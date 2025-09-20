import QuizCard from "./QuizCard";
import type { QuizItem } from "../types";

type Props = {
    items: QuizItem[];
    onSelect?: (id: string) => void;
};

export default function QuizList({ items, onSelect }: Props) {
    return (
        <ul>
            {items.map((q) => (
                <li key={q.id}>
                    <QuizCard item={q} onSelect={onSelect} />
                </li>
            ))}
        </ul>
    );
}
