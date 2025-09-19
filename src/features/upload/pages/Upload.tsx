import { useCallback, useRef, useState } from "react";
import SearchHeader from "../../../shared/components/SearchHeader";
import PostCardList from "../components/PostCardList";
import NewFileModal from "../components/NewFileModal";
import BottomBar from "../../../shared/components/BottomBar";
import { uploadResource } from "../api/resources";

type SummaryItem = {
    id: string;
    title: string;
    status: "processing" | "ready";
    coverText?: string;
    pages: string[];
    createdAt: string;
};

export default function Upload() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [items, setItems] = useState<SummaryItem[]>([]);

    const handleNewClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;
        setPendingFile(file);
        setModalOpen(true);
        e.currentTarget.value = "";
    }, []);

    const handleModalClose = useCallback(() => {
        setModalOpen(false);
        setPendingFile(null);
    }, []);

    const handleCreate = useCallback(
        async (title: string) => {
            try {
                if (!pendingFile) return;

                // 서버 업로드
                const resp = await uploadResource(pendingFile, title);
                const generatedId = typeof resp === "string" ? resp : (resp as any).id ?? crypto.randomUUID();

                const newItem: SummaryItem = {
                    id: String(generatedId),
                    title,
                    status: "processing",
                    coverText: "요약중...",
                    pages: [],
                    createdAt: new Date().toISOString(),
                };

                setItems((prev) => [newItem, ...prev]);
                setModalOpen(false);
                setPendingFile(null);
            } catch (e) {
                console.error(e);
                alert("업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.");
            }
        },
        [pendingFile]
    );

    return (
        <div>
            <SearchHeader />
            <main className="mt-10">
                <section className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 px-4 place-items-center">
                    <div className="flex flex-col items-center gap-5">
                        {/* 파일 선택 + 모달 오픈 */}
                        <button
                            className="h-60 w-40 border border-dashed rounded-2xl border-[#006FFF] text-8xl text-[#006FFF]"
                            onClick={handleNewClick}
                        >
                            +
                        </button>
                        <span>신규</span>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* 요약 리스트 */}
                    <PostCardList items={items} />
                </section>
            </main>
            <BottomBar />

            {/* 제목 입력 모달 */}
            <NewFileModal open={modalOpen} onClose={handleModalClose} onSubmit={handleCreate} />
        </div>
    );
}
