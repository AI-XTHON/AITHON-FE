import type { Choice } from "../types";

// 주석: 질문 내용을 props로 받기 위해 questionText 타입을 추가합니다.
type AnswerListProps = {
    choices: Choice[];
    questionText: string;
    onSelect?: (choiceId: string) => void;
};

// 주석: props에서 questionText를 구조 분해 할당으로 받습니다.
export default function AnswerList({ choices, questionText, onSelect }: AnswerListProps) {
    return (
        <ul>
            {choices.map((c) => (
                <li key={c.id}>
                    <button
                        type="button"
                        onClick={() => onSelect?.(c.id)}
                        className="p-3 border-2 rounded-2xl w-full bg-white text-left mb-3 flex items-center gap-x-3"
                    >
                        <span className="rounded-full border text-xs px-2.5 py-1">{c.text}</span>
                        {/* 주석: 기존의 하드코딩된 텍스트를 questionText prop으로 교체합니다. */}
                        <span>{questionText}</span>
                    </button>
                </li>
            ))}
        </ul>
    );
}