import msg from "../assets/msg.svg";

export default function EmptyState() {
    return (
        <div className="relative flex justify-center">
            <p className=" absolute mt-72 text-center text-2xl font-semibold">아직 올려주신 자료가 없어요</p>
            <img className="absolute top-150 left-13" src={msg} alt="자료 업로드 안내" />
            <p className="absolute top-157 left-22">
                <span className="text-[#F15A24]">자료</span>를 업로드 해주세요
            </p>
        </div>
    );
}
