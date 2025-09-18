import { memo } from "react";

export const ProgressBar = memo(function ProgressBar({ percent = 25 }: { percent?: number }) {
    return (
        <div className="w-full sticky top-22">
            <div className="h-1.5 w-full bg-[#debdb0] overflow-hidden">
                <div
                    className="h-full bg-[#F15A24] transition-all"
                    style={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}
                />
            </div>
        </div>
    );
});
