import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./ChatPage.css";

const API_URL = "http://192.168.88.114:8000/chat";
const ORANGE = "#F15A24";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [lastQuestion, setLastQuestion] = useState("미분 방정식을 알려줘");
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
    <div className="chat-root">
      {/* 상단 헤더 */}
      <header className="chat-header">
        <button
          className="back-btn"
          onClick={() => window.history.back()}
          aria-label="뒤로가기"
        >
          {/* 왼쪽 화살표 */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="title">AI 질문하기</h1>
        <div className="right-spacer" />
      </header>

      <main className="chat-body">
        {/* 오렌지 칩 */}
        {lastQuestion && (
          <div className="chip" style={{ backgroundColor: ORANGE }}>
            <span className="chip-text">{lastQuestion}</span>
          </div>
        )}

        {/* 흰 카드: 답변 영역 */}
        <section className="card">
          {answer ? (
            <pre className="answer">{answer}</pre>
          ) : (
            <div className="placeholder">여기에 AI 답변이 표시돼요.</div>
          )}
        </section>
      </main>

      {/* 하단 입력 바 */}
      <div className="input-wrap">
        <input
          ref={inputRef}
          className="input"
          placeholder="내용을 작성해주세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          className="search-btn"
          onClick={send}
          disabled={loading || input.trim().length === 0}
          aria-label="질문 보내기"
          title="질문 보내기"
        >
          {loading ? (
            <span className="dots">···</span>
          ) : (
            // 돋보기 아이콘
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#111" strokeWidth="2" />
              <path d="M20 20l-3.2-3.2" stroke="#111" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
