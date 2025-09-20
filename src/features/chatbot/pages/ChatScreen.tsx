import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../../../shared/components/Header";
const API_URL = "http://192.168.88.114:8000/chat";
import sendIcon from '../assets/send.svg';

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const send = useCallback(async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    try {
      setLoading(true);
      setLastQuestion(msg);
      setAnswer("");
      const res = await axios.post(
        API_URL,
        { message: msg },
        { headers: { "Content-Type": "application/json" }, timeout: 30000 }
      );
      const data =
        typeof res.data === "string"
          ? res.data
          : res.data?.reply ?? res.data?.message ?? JSON.stringify(res.data);
      setAnswer(data);
      setInput("");
      inputRef.current?.blur();
    } catch (err: any) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "요청 중 오류가 발생했어요. 서버/네트워크를 확인해주세요.";
      setAnswer(`오류: ${detail}`);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  // Enter로 전송
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") send();
  };

  // 처음 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div >
      {/* 상단 헤더 */}
      <Header title="AI 질문하기" />

      <main className="p-4 relative ">
        {/* 오렌지 칩 */}
        {lastQuestion && (
          <div className="text-end mb-5">
            <span className="text-white bg-[#F15A24] py-3 px-5 rounded-full ">{lastQuestion}</span>
          </div>
        )}

        {/* 흰 카드: 답변 영역 */}
        <section className="bg-white rounded-2xl p-5 shadow-[0px_4px_4px_0px_#00000040] mr-25">
          {answer ? (
            <pre className="text-black text-base">{answer}</pre>
          ) : (
            <div className="placeholder">여기에 AI 답변이 표시돼요.</div>
          )}
        </section>
      </main>

      {/* 하단 입력 바 */}
      <div className="absolute bottom-0 p-5 w-full ">
        <div className="relative ">
          <input
            ref={inputRef}
            className="p-5 bg-[#F15A2443] rounded-2xl w-full"
            placeholder="내용을 작성해주세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            className="absolute right-3 top-8 -translate-y-1/2"
            onClick={send}
            disabled={loading || input.trim().length === 0}
            aria-label="질문 보내기"
            title="질문 보내기"
          >
            {loading ? (
              <span className="dots">···</span>
            ) : (
              <img src={sendIcon} alt="전송" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
