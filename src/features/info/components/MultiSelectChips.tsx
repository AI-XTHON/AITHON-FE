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
                            "w-full rounded-lg px-4 py-3 text-sm text-left transition",
                            active
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300",
                        ].join(" ")}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}
