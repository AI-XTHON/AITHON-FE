import { useCallback, useMemo } from "react";
import BottomBar from "../../../shared/components/BottomBar";
import SearchHeader from "../../../shared/components/SearchHeader";
import QuizList from "../components/QuizList";
import EmptyState from "../components/EmptyState";

export default function QuizPage() {
    // [빠른 임시 데이터] 서버 연동 전까지 하드코딩
    // 필요 시 아래 두 줄을 토글하면서 확인
    // const quizList = useMemo(() => [], []); // ← 1번 화면
    const quizList = useMemo(
        () => [{ id: "1", title: "데이터 전처리" },
        { id: "2", title: "데이터 전처리" }
        ],
        []
    );

    const handleSelect = useCallback((id: string) => {
        // TODO: 선택 시 상세로 이동 또는 퀴즈 시작
        console.log("select quiz:", id);
    }, []);

    return (
        <div>
            <SearchHeader placeholder="주제를 입력해주세요." />
            <main className="px-7 mt-2">
                {quizList.length === 0 ? (
                    <EmptyState />
                ) : (
                    <QuizList items={quizList} onSelect={handleSelect} />
                )}
            </main>
            <BottomBar />
        </div>
    );
}
