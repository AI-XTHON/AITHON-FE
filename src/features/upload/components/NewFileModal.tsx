import { useCallback, useEffect, useRef, useState } from "react";
import plus from '../assets/plus.svg'
type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (title: string) => void;
};

export default function NewFileModal({ open, onClose, onSubmit }: Props) {
    const [title, setTitle] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setTitle("");
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [open]);

    const handleSubmit = useCallback(() => {
        const trimmed = title.trim();
        if (trimmed.length === 0) {
            alert("제목을 작성해주세요.");
            return;
        }
        onSubmit(trimmed);
    }, [title, onSubmit]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center ">
            <div className="rounded-xl p-5 w-80 border-solid border-white border-t-0 border-l-0 border-r-[1.5px] border-b-[1.5px] bg-[linear-gradient(153.13deg,rgba(255,255,255,0.7)_2.03%,rgba(153,153,153,0.7)_155.19%)]">
                <button onClick={onClose} className="text-2xl pl-1 mb-2">x</button>
                <input
                    ref={inputRef}
                    className="w-full rounded-md px-3 py-2 bg-white"
                    placeholder="제목을 작성해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="my-25 flex justify-center gap-2 ">
                    <button onClick={handleSubmit} >
                        <img src={plus} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
}
