import React, { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

export default function Stage4CodingRound({ approaches, question, difficulty, onFinish }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [codeByIdx, setCodeByIdx] = useState({});
  const [statusByIdx, setStatusByIdx] = useState({});
  const [errorByIdx, setErrorByIdx] = useState({});
  const [allErrorsByIdx, setAllErrorsByIdx] = useState({}); // NEW: accumulate all errors for summary
  const [submitting, setSubmitting] = useState(false);
  const [approachOpen, setApproachOpen] = useState(true);
  const [showTip, setShowTip] = useState(false);

  const selectedApproach = approaches[selectedIdx];


  const handleCodeChange = (e) => {
    setCodeByIdx({ ...codeByIdx, [selectedIdx]: e.target.value });
    // Clear errors for the current approach in the UI only
    setErrorByIdx(prev => ({
      ...prev,
      [selectedIdx]: []
    }));
    setStatusByIdx(prev => ({
      ...prev,
      [selectedIdx]: undefined
    }));
  };



  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.stage4}/analyze-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: codeByIdx[selectedIdx] || "",
          approach: selectedApproach.description,
          question,
          difficulty,
        }),
      });
      const data = await res.json();
      if (data.status === "correct") {
        setStatusByIdx({ ...statusByIdx, [selectedIdx]: "correct" });
      } else {
        setStatusByIdx({ ...statusByIdx, [selectedIdx]: "error" });
        setErrorByIdx(prev => ({
          ...prev,
          [selectedIdx]: [
            ...(prev[selectedIdx] || []),
            data.message || "Unknown error"
          ]
        }));
        setAllErrorsByIdx(prev => ({
          ...prev,
          [selectedIdx]: [
            ...(prev[selectedIdx] || []),
            data.message || "Unknown error"
          ]
        }));
      }
    } catch (err) {
      setStatusByIdx({ ...statusByIdx, [selectedIdx]: "error" });
      setErrorByIdx(prev => ({
        ...prev,
        [selectedIdx]: [...(prev[selectedIdx] || []), "Network error"]
      }));
      setAllErrorsByIdx(prev => ({
        ...prev,
        [selectedIdx]: [...(prev[selectedIdx] || []), "Network error"]
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinish = () => {
    // Use allErrorsByIdx for the summary
    const codingErrors = Object.entries(allErrorsByIdx).map(([idx, errors]) => ({
      approachIdx: Number(idx),
      errorMessages: errors
    }));
    onFinish(codingErrors); // Pass to parent (Dashboard)
  };



  // Close tip on outside click
  React.useEffect(() => {
    if (!showTip) return;
    function handle(e) {
      if (e.target.closest("#stage4-tip-popover") || e.target.closest("#stage4-tip-btn")) return;
      setShowTip(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [showTip]);

  return (
    <div className="flex flex-row w-full h-[80vh] min-h-[600px] max-h-[90vh] bg-gradient-to-br from-black via-gray-900 to-gray-950 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      {/* Sidebar: Approach List (Collapsible) */}
      <div className={`relative flex flex-col transition-all duration-300 ${approachOpen ? "w-56 min-w-[180px]" : "w-4 min-w-[16px]"} bg-black/80 border-r border-cyan-400/10 py-6 px-2 gap-2`}>
        <button
          className={
            approachOpen
              ? "absolute top-2 right-2 z-10 text-cyan-400 hover:text-cyan-200 text-xl font-bold focus:outline-none"
              : "flex items-center justify-center w-full h-full z-10 text-cyan-300 text-3xl font-extrabold bg-black/70 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
          }
          style={approachOpen ? {} : { position: 'absolute', top: 0, left: 0 }}
          onClick={() => setApproachOpen(open => !open)}
          title={approachOpen ? "Hide Approaches" : "Show Approaches"}
          aria-label={approachOpen ? "Hide Approaches" : "Show Approaches"}
        >
          {approachOpen ? "✕" : <span className="block mx-auto">≡</span>}
        </button>
        {approachOpen && (
          <>
            <div className="text-cyan-300 font-bold text-lg mb-4 pl-2 font-mono tracking-wide">Approaches</div>
            <ul className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
              {approaches.map((a, idx) => (
                <li key={idx}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg font-mono text-base transition-all duration-150 border-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:z-10
                      ${idx === selectedIdx
                        ? "bg-gradient-to-r from-cyan-900 via-cyan-800 to-cyan-900 border-cyan-400 text-cyan-100 shadow-lg"
                        : "bg-black/60 border-cyan-400/10 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-400/40"}
                    `}
                    onClick={() => setSelectedIdx(idx)}
                  >
                    <div className="truncate font-semibold">{a.description}</div>
                    <div className="text-xs text-cyan-200 mt-1">Time: {a.timeComplexity} | Space: {a.spaceComplexity}</div>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Main Coding Area */}
      <div className="flex-1 flex flex-col items-center justify-start py-8 px-6 bg-gradient-to-br from-black/80 via-gray-900/80 to-cyan-950/80">
        {/* Header */}
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="text-cyan-300 font-mono text-lg font-bold">{selectedApproach.description}</div>
            <div className="text-cyan-200 font-mono text-xs mt-1">Time: {selectedApproach.timeComplexity} | Space: {selectedApproach.spaceComplexity}</div>
          </div>
          {/* Help Icon */}
          <button
            id="stage4-tip-btn"
            className="ml-4 text-cyan-300 hover:text-cyan-100 text-2xl rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            title="How to use this section?"
            aria-label="How to use this section?"
            onClick={() => setShowTip(v => !v)}
            type="button"
          >
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="inline align-middle"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><text x="12" y="17" textAnchor="middle" fontSize="13" fill="currentColor" fontFamily="monospace">?</text></svg>
          </button>
        </div>
        {/* Tip Popover */}
        {showTip && (
          <div
            id="stage4-tip-popover"
            className="absolute top-20 right-10 z-50 bg-black/95 border border-cyan-400/30 rounded-xl shadow-xl p-6 w-80 max-w-xs text-cyan-100 font-mono text-base animate-fade-in"
            style={{ minWidth: 220 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-cyan-300 font-bold text-lg">How to use this section?</span>
              <button
                className="text-cyan-400 hover:text-cyan-200 text-xl font-bold focus:outline-none"
                onClick={() => setShowTip(false)}
                title="Close"
                aria-label="Close"
                type="button"
              >
                ✕
              </button>
            </div>
            <ul className="list-disc pl-5 text-cyan-200 text-sm space-y-2">
              <li><b>Approach section:</b> Each approach was described by you in the previous round. Select one to code it.</li>
              <li><b>How to use:</b> Pick an approach, write your code, and submit. Collapse the sidebar for more space.</li>
            </ul>
          </div>
        )}
        {/* Code Editor */}
        <div className="w-full flex-1 flex flex-col bg-black/80">
          <textarea
            className={`flex-1 w-full min-h-[320px] h-full max-h-[48vh] resize-none font-mono text-lg p-4 bg-transparent border-b border-cyan-900 focus:border-cyan-400 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all duration-200 placeholder-cyan-400/40
              ${statusByIdx[selectedIdx] === "correct" ? "ring-2 ring-green-400" : ""}
            `}
            value={codeByIdx[selectedIdx] || ""}
            onChange={handleCodeChange}
            placeholder="// Write your code here"
            disabled={submitting}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            tabIndex={0}
          />
        </div>
        {/* Error Message */}
        {statusByIdx[selectedIdx] === "error" && errorByIdx[selectedIdx] && (
  <div className="w-full mt-3 flex flex-col items-center justify-center">
    {errorByIdx[selectedIdx].map((msg, i) => (
      <div
        key={i}
        className="bg-red-900/80 border border-red-400 text-red-200 font-mono px-6 py-3 rounded-lg shadow-lg text-base animate-fade-in mb-2"
      >
        {msg}
      </div>
    ))}
  </div>
)}
        {/* Buttons */}
        <div className="w-full flex flex-row gap-3 mt-6 justify-end">
          <button
            className="px-5 py-2 border border-cyan-400 text-cyan-300 bg-transparent hover:bg-cyan-900/20 rounded-full font-mono text-base transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Checking..." : "Submit Code"}
          </button>
          <button
            className="px-5 py-2 border border-cyan-400 text-cyan-200 bg-transparent hover:bg-green-900/20 rounded-full font-mono text-base transition focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={handleFinish}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}