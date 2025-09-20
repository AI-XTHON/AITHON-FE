import Header from "../../../shared/components/Header";
import msg2 from "../assets/msg2.svg";

export default function QuizResult() {
    const total = 20;
    const correct = 18;
    const wrongList = [6, 9];
    const firstWrong = wrongList[0];

    return (
        <div className=" min-h-screen">
            <Header title="퀴즈 결과" />
            <main className="p-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 min-h-150 max-w-sm mx-auto text-center">
                    <p className="mb-6 text-lg font-semibold">
                        {correct}/{total}
                    </p>

                    <div className="grid grid-cols-5 gap-4 justify-items-center mb-10">
                        {Array.from({ length: 18 }, (_, i) => {
                            const num = i + 1;
                            const isWrong = wrongList.includes(num);
                            const showMsg = num === firstWrong;
                            return (
                                <div key={num} className="relative flex justify-center">
                                    {showMsg && (
                                        <>
                                            <img
                                                src={msg2}
                                                alt="틀린 문제를 클릭해서 확인해보세요."
                                                className="absolute bottom-full left--1 max-w-none mb-2"
                                            />
                                            <p className="absolute w-40 bottom-17 text-xs" >틀린 문제를 클릭해서<br />확인해보세요.</p>
                                        </>
                                    )}
                                    <div>
                                        <button
                                            type="button"
                                            className={`w-8 h-8 ml-2 rounded-full border-2 flex items-center justify-center text-sm font-medium ${isWrong
                                                ? " border-[#E70000] text-red-500" // 틀린 문제 스타일
                                                : "border-black text-black" // 맞은 문제 스타일
                                                }`}
                                            onClick={() => console.log(`문제 ${num} 조회`)}
                                        >
                                            {num}

                                        </button>

                                        <div className="h-px bg-black mt-1 w-full flex-none" />
                                    </div>
                                </div>

                            );
                        })}
                    </div>

                    <p className="text-black text-center">
                        XX님의 부족한 부분은 ___ 이러한 부분입니다.
                    </p>
                </div>
            </main>
        </div>
    );
}