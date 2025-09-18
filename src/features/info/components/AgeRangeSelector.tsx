import SmileIcon from '../assets/smile.svg';

type Props = {
    options: string[];
    value: string;
    onChange: (v: string) => void;
};

export default function AgeRangeSelector({ options, value, onChange }: Props) {
    return (
        <div className="relative w-full py-6 ">

            {/* 1. 트랙(선) */}
            <div className="absolute left-12 right-12 top-1/3 -translate-y-1/2 h-[2px] bg-[#F15A24] z-0" />

            {/* 2. 옵션 버튼들을 담는 컨테이너 */}
            <div className="relative z-10 grid grid-cols-4 ">
                {options.map((opt) => {
                    const active = value === opt;
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => onChange(opt)}
                            aria-pressed={active}
                            className="flex flex-col items-center focus:outline-none"
                        >
                            {/* 2.1. 스마일 아이콘과 텍스트 영역 (DOM 순서를 위로 이동) */}
                            <div
                                className={`
                                    flex flex-col items-center rounded-lg px-3 pb-6 pt-3 
                                    transition-colors duration-200
                                    ${active ? 'bg-[#F15A2452]' : 'bg-transparent'}
                                `}
                            >

                                {/* 아이콘 표시 공간 */}
                                <div className="h-10 w-10">
                                    {active && ( // active 상태일 때만 스마일 아이콘 표시
                                        <img src={SmileIcon} alt="선택됨" className="h-full w-full" />
                                    )}
                                </div>
                                {/* 2.2. 옵션 위치를 나타내는 점 (DOM 순서를 아래로 이동) */}
                                <span
                                    className={[
                                        "absolute top-1/4 -translate-y-1/2",
                                        "h-3 w-3 rounded-full border-2 border-[#F15A24]",
                                        active ? "bg-transparent opacity-0" : "bg-[#d7dbdc] opacity-100",
                                    ].join(" ")}
                                />
                                {/* 옵션 텍스트 */}
                                <span
                                    className={`
                                        mt-2 text-sm
                                        transition-colors duration-200
                                        ${active ? 'font-bold text-[#F15A24]' : 'font-medium text-gray-500'}
                                    `}
                                >
                                    {opt}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}