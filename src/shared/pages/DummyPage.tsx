import BottomBar from "../components/BottomBar";
import Header from "../components/Header";

export default function DummyPage() {
    return (
        <div className="bg-[#d7dbdc]">
            <Header title='홈 화면'/>
            <div className="h-[300px] "/>
            <BottomBar />
        </div>
    )
}