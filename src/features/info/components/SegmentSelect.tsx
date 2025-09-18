import CheckIcon from '../assets/check.svg';
import CheckedIcon from '../assets/checked.svg'

type Props = {
    name: string;
    options: string[];
    value: string;
    onChange: (v: string) => void;
};

export default function SegmentSelect({ name, options, value, onChange }: Props) {
    return (
        <div className='px-3'>
            {options.map((opt) => {
                const active = value === opt;
                return (
                    <button
                        key={opt}
                        type="button"
                        role="radio"
                        aria-label={name}
                        aria-checked={active}
                        onClick={() => onChange(opt)}
                        className={[
                            "w-full rounded-lg p-2.5 text-sm text-left transition mb-2 flex items-center gap-1",
                            active
                                ? "bg-[#F15A2478] text-[#F15A24] border border-[#F15A24]"
                                : "bg-[#9494946B] text-[#585858] hover:bg-gray-300",
                        ].join(" ")}
                    >
                        {/* <CheckIcon fill={active ? "#F15A24" : "#585858"} /> */}
                        <img src={active ? CheckedIcon : CheckIcon} className='w-[24px] h-[24px]' />
                        <span>{opt}</span>
                    </button>
                );
            })}
        </div>
    );
}
