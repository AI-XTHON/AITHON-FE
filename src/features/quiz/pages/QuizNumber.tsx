import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../shared/components/Header";
import type { Choice } from "../types";
import AnswerList from "../components/AnswerList";

// Problem 타입에 question 필드를 추가합니다.
type Problem = { id: string; question: string; imageUrl?: string; choices: Choice[] };

// 임시 데이터 각 항목에 question 필드를 추가합니다.
const DUMMY_PROBLEMS: Problem[] = Array.from({ length: 20 }).map((_, i) => ({
    id: String(i + 1),
    question: `다음 중 올바른 것을 고르시오.`, // 동적 질문
    imageUrl: undefined, // 실제 이미지 URL 연동 시 대체
    choices: [
        { id: "1", text: "1" },
        { id: "2", text: "2" },
        { id: "3", text: "3" },
        { id: "4", text: "4" },
        { id: "5", text: "5" },
    ],
}));

export default function QuizNumber() {
    const navigate = useNavigate();
    const { index: indexParam, quizId } = useParams<{ index: string; quizId: string }>();

    const index = useMemo(() => {
        const n = Number(indexParam ?? "0");
        return Number.isFinite(n) && n >= 0 ? n : 0;
    }, [indexParam]);

    const total = DUMMY_PROBLEMS.length;
    const problem = DUMMY_PROBLEMS[Math.min(index, total - 1)];
    const title = `${index + 1}/${total}`;

    const goPrev = useCallback(() => {
        if (index <= 0) return;
        navigate(`/quiz/${quizId}/q/${index - 1}`);
    }, [index, navigate, quizId]);

    const goNext = useCallback(() => {
        if (index >= total - 1) return;
        navigate(`/quiz/${quizId}/q/${index + 1}`);
    }, [index, navigate, quizId, total]);

    const onSelect = useCallback((choiceId: string) => {
        // TODO: 선택 로직(제출/체크) 연동
        console.log("select choice:", choiceId);
    }, []);

    return (
        <div>
            <Header title={title} />

            <main className="flex justify-between p-4">
                <button type="button" onClick={goPrev} aria-label="이전">&lt;</button>

                <div>
                    {/* 이미지 자리 - 이미지가 없으면 대체 텍스트 */}
                    {problem.imageUrl ? (
                        <img src={problem.imageUrl} alt="문제 이미지" className="w-full rounded-2xl" />
                    ) : (
                        <div className="bg-white rounded-2xl p-25 border text-lg mb-4">문제 이미지</div>
                    )}

                    <AnswerList
                        choices={problem.choices}
                        onSelect={onSelect}
                        questionText={problem.question}
                    />
                </div>

                <button type="button" onClick={goNext} aria-label="다음">&gt;</button>
            </main>
        </div>
    );
}