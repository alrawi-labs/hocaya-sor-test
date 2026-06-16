"use client";

import { useState, useRef, useEffect } from "react";

function UserIcon() {
  return (
    <div style={s.avatarUser}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    </div>
  );
}

function BotIcon() {
  return (
    <div style={s.avatarBot}>
      <img src="/hocayasor_logo_no_background.png" alt="Hocaya Sor" style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} />
    </div>
  );
}

function TypingDots() {
  return (
    <div style={s.typingWrapper}>
      <BotIcon />
      <div style={s.typingBubble}>
        <span style={{ ...s.dot, animationDelay: "0s" }} />
        <span style={{ ...s.dot, animationDelay: "0.2s" }} />
        <span style={{ ...s.dot, animationDelay: "0.4s" }} />
      </div>
    </div>
  );
}

const WELCOME = {
  role: "assistant",
  content: "Bismillah. Merhaba, ben \"Hocaya Sor\" asistanıyım. İslami konularda sorularınızı buraya yazabilirsiniz. Fetva veri tabanına dayalı bilgi sunmaya çalışırım.",
  sources: [],
};

export default function ChatPage() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function autoResize() {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((p) => [...p, { role: "user", content: text }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((p) => [
        ...p,
        res.ok
          ? { role: "assistant", content: data.answer, sources: data.sources || [] }
          : { role: "assistant", content: `Hata: ${data.error}`, sources: [] },
      ]);
    } catch (err) {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: `Bağlantı hatası: ${err.message}`, sources: [] },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      <style>{dotAnim}</style>
      <div style={s.page}>
        {/* Banner */}
        <div style={s.banner}>
          <div style={s.bannerInner}>
            <img
              src="/hocayasor_logo_no_background.png"
              alt="Hocaya Sor"
              style={s.bannerLogo}
            />
            <div>
              <div style={s.bannerTitle}>Hocaya Sor</div>
              <div style={s.bannerSub}>Fetva veri tabanına dayalı İslami soru-cevap asistanı</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={s.messages}>
          {messages.map((m, i) => (
            <div key={i} style={m.role === "user" ? s.rowUser : s.rowBot}>
              {m.role === "assistant" && <BotIcon />}
              <div style={m.role === "user" ? s.bubbleUser : s.bubbleBot}>
                <p style={s.msgText}>{m.content}</p>
                {m.sources?.length > 0 && (
                  <div style={s.sources}>
                    <div style={s.sourcesLabel}>📎 Kaynaklar</div>
                    {m.sources.map((src, j) => (
                      <a key={j} href={src.url} target="_blank" rel="noreferrer" style={s.sourceLink}>
                        {src.topic}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {m.role === "user" && <UserIcon />}
            </div>
          ))}
          {loading && <TypingDots />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={s.inputBar}>
          <div style={s.inputWrap}>
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => { setInput(e.target.value); autoResize(); }}
              onKeyDown={onKey}
              placeholder="Sorunuzu yazın…"
              style={s.textarea}
              disabled={loading}
            />
            <button onClick={send} disabled={loading || !input.trim()} style={{
              ...s.sendBtn,
              opacity: (loading || !input.trim()) ? 0.5 : 1,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p style={s.disclaimer}>
            Bu asistan bilgi amaçlıdır. Kişisel dini rehberlik için bir âlime danışınız.
          </p>
        </div>
      </div>
    </>
  );
}

const dotAnim = `
@keyframes blink {
  0%, 80%, 100% { opacity: 0.2; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-4px); }
}
`;

const s = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 64px)",
    maxWidth: 760,
    margin: "0 auto",
  },
  banner: {
    background: "linear-gradient(135deg, #1B2A4A 0%, #243660 100%)",
    padding: "14px 24px",
    borderBottom: "1px solid rgba(201,168,76,0.2)",
  },
  bannerInner: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    maxWidth: 760,
    margin: "0 auto",
  },
  bannerLogo: {
    width: 48,
    height: 48,
    objectFit: "cover",
    flexShrink: 0,
  },
  bannerTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#FFFFFF",
    lineHeight: 1.2,
  },
  bannerSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  rowBot: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },
  rowUser: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    gap: 10,
  },
  avatarBot: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#1B2A4A",
    border: "2px solid #C9A84C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  avatarUser: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #C9A84C, #E8C96A)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  bubbleBot: {
    background: "#FFFFFF",
    border: "1px solid #E8E2D6",
    borderRadius: "4px 14px 14px 14px",
    padding: "12px 16px",
    maxWidth: "calc(100% - 88px)",
    boxShadow: "0 2px 8px rgba(27,42,74,0.07)",
    color: "#1A1A2E",
  },
  bubbleUser: {
    background: "linear-gradient(135deg, #1B2A4A, #243660)",
    borderRadius: "14px 4px 14px 14px",
    padding: "12px 16px",
    maxWidth: "calc(100% - 88px)",
    boxShadow: "0 2px 8px rgba(27,42,74,0.2)",
    color: "#FFFFFF",
  },
  msgText: {
    fontSize: 15,
    lineHeight: 1.65,
    color: "inherit",
    whiteSpace: "pre-wrap",
  },
  sources: {
    marginTop: 12,
    paddingTop: 10,
    borderTop: "1px solid #E8E2D6",
  },
  sourcesLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#6B7280",
    letterSpacing: "0.05em",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  sourceLink: {
    display: "block",
    fontSize: 12,
    color: "#1B2A4A",
    padding: "4px 8px",
    borderRadius: 6,
    background: "#F5EDD6",
    marginBottom: 4,
    textDecoration: "none",
    fontWeight: 500,
  },
  typingWrapper: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },
  typingBubble: {
    background: "#FFFFFF",
    border: "1px solid #E8E2D6",
    borderRadius: "4px 14px 14px 14px",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: 5,
    boxShadow: "0 2px 8px rgba(27,42,74,0.07)",
  },
  dot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#C9A84C",
    animation: "blink 1.2s infinite ease-in-out",
  },
  inputBar: {
    padding: "12px 16px 16px",
    borderTop: "1px solid #E8E2D6",
    background: "#FAF8F3",
  },
  inputWrap: {
    display: "flex",
    gap: 10,
    alignItems: "flex-end",
    background: "#FFFFFF",
    border: "2px solid #E8E2D6",
    borderRadius: 14,
    padding: "8px 8px 8px 14px",
    boxShadow: "0 2px 12px rgba(27,42,74,0.07)",
    transition: "border-color 0.2s",
  },
  textarea: {
    flex: 1,
    border: "none",
    background: "transparent",
    resize: "none",
    fontSize: 15,
    lineHeight: 1.5,
    color: "#1A1A2E",
    minHeight: 24,
    maxHeight: 120,
    padding: "4px 0",
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "linear-gradient(135deg, #1B2A4A, #243660)",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    transition: "opacity 0.2s, transform 0.1s",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 8,
    lineHeight: 1.4,
  },
};