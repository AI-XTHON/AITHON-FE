import { useCallback, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import type { Mode, UserInfoSubmit } from "../types";
import { initialState, reducer } from "../state/reducer";
import Header from "../../../shared/components/Header";
import { ProgressBar } from "../components/ProgressBar";
import SegmentSelect from "../components/SegmentSelect";
import AgeRangeSelector from "../components/AgeRangeSelector";
import MultiSelectChips from "../components/MultiSelectChips";
import msg from "../assets/msg.svg";

const OCCUPATIONS = ["중학생", "고등학생", "대학생/대학원생", "직장인", "기타"];
const AGE_RANGES = ["10대", "20대", "30대", "40대 이상"];
const PURPOSES = ["학교 시험 공부", "자격증 공부", "기타"];

import { map_form_to_onboard, post_users_onboard } from "../api/users";
import { map_form_to_update, patch_users_me } from "../api/edit";

type Props = {
    mode: Mode;
    initialOccupation?: string | null;
    initialAgeRange?: string | null;
    initialPurposes?: string[] | null;
    initialNickname?: string | null; // edit 확장 필드
    onSubmit?: (data: UserInfoSubmit) => void;
    onBack?: () => void;
};

export default function UserInfoPage({
    mode,
    initialOccupation = "",
    initialAgeRange = "",
    initialPurposes = [],
    initialNickname = "",
    onSubmit,
}: Props) {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        occupation: initialOccupation ?? "",
        ageRange: initialAgeRange ?? "",
        purposes: initialPurposes ?? [],
        nickname: initialNickname ?? "",
    });

    const title = mode === "onboarding" ? "알아보기" : "수정하기";

    // 진행도 계산
    const progressPercent = useMemo(() => {
        const completedCount = [
            state.occupation !== "",
            state.ageRange !== "",
            state.purposes.length > 0,
        ].filter(Boolean).length;

        if (completedCount === 3) return 100;
        if (completedCount === 2) return 66;
        if (completedCount === 1) return 33;
        return 0;
    }, [state.occupation, state.ageRange, state.purposes]);

    const isValid = useMemo(
        () => state.occupation !== "" && state.ageRange !== "" && state.purposes.length > 0,
        [state.occupation, state.ageRange, state.purposes.length]
    );

    const handleSubmit = useCallback(async () => {
        if (!isValid) return;

        if (mode === "onboarding") {
            try {
                const req = map_form_to_onboard({
                    occupation: state.occupation,
                    ageRange: state.ageRange,
                    purposes: state.purposes,
                });
                await post_users_onboard(req); // 401/400 처리: http 인터셉터에서 예외 throw
                onSubmit?.({
                    occupation: state.occupation,
                    ageRange: state.ageRange,
                    purposes: state.purposes,
                });
                navigate('/');
            } catch (e) {
                console.error(e);
                alert("온보딩 저장에 실패했습니다. 로그인/입력값을 확인해주세요.");
            }
        } else {
            try {
                const req = map_form_to_update({
                    occupation: state.occupation,
                    ageRange: state.ageRange,
                    purposes: state.purposes,
                    nickname: state.nickname,
                });
                await patch_users_me(req);
                onSubmit?.({
                    occupation: state.occupation,
                    ageRange: state.ageRange,
                    purposes: state.purposes,
                    nickname: state.nickname,
                });
                navigate("/mypage");
            } catch (e) {
                console.error(e);
                alert("회원 정보 수정에 실패했습니다. 로그인/입력값을 확인해주세요.");
            }
        }
    }, [isValid, mode, navigate, onSubmit, state]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header title={title} />
            {mode === "onboarding" && <ProgressBar percent={progressPercent} />}

            <main className="flex-1 px-8 py-5 space-y-20">
                {/* Q1 직업 */}
                <section>
                    <h2 className="text-sm font-medium mb-3">
                        1. 당신의 직업은 무엇인가요? <span className="text-orange-600">*</span>
                    </h2>
                    <SegmentSelect
                        name="occupation"
                        options={OCCUPATIONS}
                        value={state.occupation}
                        onChange={(v) => dispatch({ type: "SET_OCCUPATION", payload: v })}
                    />
                </section>

                {/* Q2 연령대 */}
                <section>
                    <h2 className="text-sm font-medium mb-8">
                        2. 당신의 연령대는 어떻게 되시나요? <span className="text-orange-600">*</span>
                    </h2>
                    <AgeRangeSelector
                        options={AGE_RANGES}
                        value={state.ageRange}
                        onChange={(v) => dispatch({ type: "SET_AGE_RANGE", payload: v })}
                    />
                </section>

                {/* Q3 목적(툴팁 문구 포함) */}
                <section className="relative space-y-3">
                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-medium">
                            3. 무슨 목적으로 사용하시는건가요? <span className="text-orange-600">*</span>
                        </h2>
                    </div>
                    <img src={msg} alt="" className="h-18" />
                    <p className="text-xs absolute left-5 top-14">
                        <span className="text-[#F15A24]">복수 응답</span> 여러개 골라주세요!
                    </p>
                    <MultiSelectChips
                        options={PURPOSES}
                        values={state.purposes}
                        onToggle={(v) => dispatch({ type: "TOGGLE_PURPOSE", payload: v })}
                    />
                </section>

                {/* edit 전용 확장 필드 */}
                {mode === "edit" && (
                    <section className="space-y-3">
                        <h2 className="text-sm font-medium">4. 닉네임을 수정하시나요?</h2>
                        <input
                            type="text"
                            placeholder="닉네임을 입력하세요"
                            value={state.nickname}
                            onChange={(e) => dispatch({ type: "SET_NICKNAME", payload: e.target.value })}
                            className="w-full rounded-lg border border-gray-500 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </section>
                )}
            </main>

            {/* 완료하기 버튼 */}
            <footer className="sticky bottom-0 px-7 pt-2 pb-6 bg-[#d7dbdc]">
                <button
                    type="button"
                    disabled={!isValid}
                    onClick={handleSubmit}
                    className={[
                        "w-full rounded-xl border-2 py-3 text-lg font-medium transition",
                        isValid
                            ? " border-orange-500 text-orange-600 hover:bg-orange-100"
                            : " border-gray-300 text-gray-400 cursor-not-allowed",
                    ].join(" ")}
                >
                    완료하기
                </button>
            </footer>
        </div>
    );
}
