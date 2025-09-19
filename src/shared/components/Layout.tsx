import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

/**
 * 앱 전체를 감싸는 레이아웃 컴포넌트
 * 화면 중앙에 위치하며 모바일 뷰포트 역할을 합니다.
 */
const Layout = ({ children }: LayoutProps) => {
    return (
        // 화면 전체를 차지하도록 설정
        <div className="flex h-screen w-full items-center justify-center bg-black">
            {/* 실제 앱 콘텐츠가 표시될 영역 */}
            <main className="relative h-full w-full max-w-lg overflow-y-auto bg-[#d7dbdc] hide-scrollbar">
                {children}
            </main>
        </div>
    );
};

export default Layout;