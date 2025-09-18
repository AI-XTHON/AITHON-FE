import CheckIcon from '../assets/check.svg';
import CheckedIcon from '../assets/checked.svg'

type Props = {
    options: string[];
    values: string[];
    onToggle: (v: string) => void;
};

export default function MultiSelectChips({ options, values, onToggle }: Props) {
    return (
        <div className="flex flex-col gap-2">
            {options.map((opt) => {
                const active = values.includes(opt);
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onToggle(opt)}
                        aria-pressed={active}
                        className={[
                            "w-full rounded-lg px-4 py-3 text-sm text-left transition flex items-center gap-1",
                            active
                                ? "bg-[#F15A2478] text-[#F15A24] border border-[#F15A24]"
                                : "bg-[#9494946B] text-[#585858] hover:bg-gray-300",
                        ].join(" ")}
                    >
                        <img src={active ? CheckedIcon : CheckIcon} className='w-[24px] h-[24px]' />
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}
