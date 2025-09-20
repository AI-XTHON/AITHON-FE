import { useLocation, useParams } from "react-router-dom";

type LocationState = {
    userChoice?: number;
    correctChoice?: number;
    commentary?: string;
    username?: string;
};

export default function QuizCommentary() {
    const { num } = useParams<{ num: string }>();
    const { state } = useLocation();
    const { userChoice, correctChoice, commentary, username } =
        (state as LocationState) || {};

    // 데모 기본값 (state 미전달 시)
    const qNumber = Number(num ?? 1);
    const user = username ?? "XX";
    const wrong = userChoice ?? 6;
    const answer = correctChoice ?? 3;
    const isWrong = wrong !== answer;

    const badge = (n: number, wrongStyle: boolean) => (
        <button
            type="button"
            className={`w-8 h-8 ml-2 rounded-full border-2 flex items-center justify-center text-sm font-medium ${wrongStyle ? "border-[#E70000] text-red-500" : "border-black text-black"
                }`}
            onClick={() => console.log(`문제 ${n} 조회`)}
        >
            {n}
        </button>
    );

    return (
        <div>
            <header className="top-0 text-center px-6 pt-10 pb-6 h-22 bg-[#d7dbdc]">
                <h1 className="text-2xl font-medium text-black">
                    퀴즈 결과
                </h1>
            </header>
            <main className="bg-white rounded-2xl shadow-lg p-6 min-h-[600px] max-w-sm mx-auto">

                <p className="text-center text-red-600 font-bold mb-6">{qNumber}번 문제</p>

                <div className="text-left space-y-4">
                    {isWrong && (
                        <p className="flex items-center">
                            {user}님의 오답:{badge(wrong, true)}
                        </p>
                    )}

                    <p className="flex items-center">
                        정답:{badge(answer, false)}
                    </p>

                    <section className="mt-6 leading-relaxed">
                        <p>{commentary ?? "해설 블라 블라 블라"}</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
