import { useCallback, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import SearchHeader from "../../../shared/components/SearchHeader";
import PostCardList from "../components/PostCardList";
import NewFileModal from "../components/NewFileModal";
import { dataStore, type SummaryItem } from "../data";
import BottomBar from "../../../shared/components/BottomBar";

export default function Upload() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setPendingFile] = useState<File | null>(null);
    const [items, setItems] = useState<SummaryItem[]>(() => dataStore.getAll());

    const handleNewClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;
        setPendingFile(file);
        setModalOpen(true);
        // 파일 인풋 초기화
        e.currentTarget.value = "";
    }, []);

    const handleModalClose = useCallback(() => setModalOpen(false), []);

    const handleCreate = useCallback((title: string) => {
        // API POST 자리(미구현). 현재는 더미 저장소에 추가.
        const id = uuid();
        const newItem: SummaryItem = {
            id,
            title,
            status: "processing",
            coverText: "요약중...",
            pages: [],
            createdAt: new Date().toISOString(),
        };
        dataStore.add(newItem);
        setItems(dataStore.getAll());
        setModalOpen(false);
        setPendingFile(null);
    }, []);

    return (
        <div >
            <SearchHeader />
            <main className=" mt-10 ">
                <section
                    className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 px-4 place-items-center">

                    <div className="flex flex-col items-center gap-5">
                        {/* 기존 신규 버튼 → 파일 선택 + 모달 오픈 */}
                        <button
                            className=" h-60 w-40 border border-dashed rounded-2xl border-[#006FFF] text-8xl text-[#006FFF]"
                            onClick={handleNewClick}
                        >
                            +
                        </button>
                        <span>신규</span>
                        {/* 숨김 파일 입력 */}
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
            <NewFileModal
                open={modalOpen}
                onClose={handleModalClose}
                onSubmit={handleCreate}
            />
        </div>
    )
}
