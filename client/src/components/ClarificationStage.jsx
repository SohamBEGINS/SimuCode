import React, { useState, useRef, useEffect } from "react";

export default function ClarificationStage({ question, difficulty, onProceed }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Scroll chat to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    const userMsg = { sender: "user", message: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/questions/clarify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          userMessage: userMsg.message,
          history: [...messages, userMsg],
          difficulty,
        }),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Invalid server response (not JSON).");
      }

      if (!res.ok) {
        throw new Error(data.aiMessage || "Failed to get AI response.");
      }

      setMessages((prev) => [...prev, { sender: "ai", message: data.aiMessage }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: "Sorry, there was an error. Please try again." },
      ]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) {
        handleSend();
      }
    }
  };

  return (
    <div className="clarification-stage w-full max-w-2xl mx-auto flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2 font-mono">
          $ Stage 2: Clarification
        </h2>
        <p className="text-cyan-300/70 text-base font-mono mb-2">
          Ask clarifying questions about the problem. You can proceed at any time.
        </p>
        <div className="bg-black/70 border border-cyan-400/20 rounded-lg p-3 text-cyan-100 font-mono mb-2">
          <b>Question:</b> {question}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto bg-black/80 rounded-xl border border-cyan-400/20 shadow-inner px-4 py-4 flex flex-col gap-2"
        style={{ minHeight: 200, maxHeight: 300 }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.sender === "user"
                ? "self-end bg-green-900 text-green-200 px-4 py-2 rounded-2xl max-w-[70%] shadow-md"
                : "self-start bg-gray-800 text-cyan-200 px-4 py-2 rounded-2xl max-w-[70%] shadow-md"
            }
          >
            <span>{msg.message}</span>
          </div>
        ))}
        {loading && (
          <div className="self-start text-cyan-400 italic animate-pulse">
            Interviewer is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) {
            handleSend();
          }
        }}
        className="flex gap-2 items-end"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Ask a clarifying question..."
          className="flex-1 min-h-[40px] max-h-32 resize-none rounded-lg font-mono text-base bg-black/60 border border-cyan-400/20 text-cyan-100 placeholder-cyan-300/50 focus:border-cyan-400 focus:outline-none px-3 py-2"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-1 bg-transparent border border-cyan-400 text-cyan-200 rounded-md font-mono text-base hover:bg-cyan-900 hover:text-white transition shadow-none"
        >
          Send
        </button>
        <div>
        
        </div>
      </form>

      {/* Proceed Button - minimalist and terminal-compatible */}
      <div className="flex justify-center mt-2">
  <button
    className="px-4 py-1 bg-transparent border border-cyan-400 text-cyan-200 rounded-md font-mono text-base hover:bg-cyan-900 hover:text-white transition shadow-none"
    onClick={onProceed}
  >
    Proceed
  </button>
</div>  

      {/* Error Message */}
      {error && (
        <div className="text-red-400 text-center mt-2">{error}</div>
      )}
    </div>
  );
}