import React from "react";
import { FaCheckCircle, FaQuestionCircle, FaLightbulb, FaCode, FaRedo, FaDownload, FaShareAlt, FaHome } from "react-icons/fa";
import Confetti from "react-confetti";

export default function SummaryAndFeedback({ summaryData }) {
  

  const hasCodingErrors = summaryData.stage4?.codingErrors?.some(e => e.errorMessages && e.errorMessages.length);

  const handleRetake = () => {
    window.location.reload();
  };
  return (
    <div className="relative min-h-[600px] w-full py-12 flex flex-col items-center animate-fade-in bg-gradient-to-br from-cyan-950 via-gray-900 to-cyan-950 summary-main-content">
      <Confetti numberOfPieces={120} recycle={false} className="pointer-events-none absolute top-0 left-0 w-full h-32 z-10" />
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-cyan-200 drop-shadow-lg mb-2 flex items-center justify-center gap-3">
          Interview Summary
        </h1>
        <p
          className="text-xl md:text-2xl font-light font-mono italic mb-8 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow text-center max-w-2xl mx-auto"
        >
          Congratulations on completing your simulated interview! Here’s a breakdown of your performance and feedback for each stage.
        </p>
      </div>
      <div className="w-full max-w-7xl flex flex-row gap-12 px-4 md:px-12 justify-between items-stretch">
        {/* Stage 1 */}
        <section className="flex-1 flex flex-col items-center justify-start gap-4 min-w-[220px]">
          <FaLightbulb className="text-yellow-400 text-5xl mb-2" />
          <h2 className="text-3xl font-bold text-cyan-100 mb-2">Stage 1</h2>
          <div className="text-cyan-100 font-mono text-xl">Incorrect Attempts:</div>
          <div className="text-cyan-200 font-extrabold text-3xl mb-4">{summaryData.stage1?.incorrectAttempts ?? 0}</div>
        </section>
        {/* Stage 2 */}
        <section className="flex-1 flex flex-col items-center justify-start gap-4 min-w-[260px]">
          <FaQuestionCircle className="text-cyan-400 text-5xl mb-2" />
          <h2 className="text-3xl font-bold text-cyan-100 mb-2">Stage 2</h2>
          <div className="text-cyan-200 font-semibold text-lg mb-1">Your Clarifications</div>
          <ul className="list-disc pl-5 text-cyan-100 text-base mb-2 w-full">
            {summaryData.stage2?.clarifications?.length
              ? summaryData.stage2.clarifications.map((q, i) => <li key={i}>{q}</li>)
              : <li className="italic text-cyan-400">No clarifications asked.</li>
            }
          </ul>
          <div className="text-cyan-200 font-semibold text-lg mb-1">AI Feedback</div>
          <div className="text-cyan-100 text-base mb-1"><b>Quality:</b> {summaryData.stage2?.feedback?.quality || "N/A"}</div>
          <ul className="list-disc pl-5 text-cyan-100 text-base w-full max-h-40 overflow-y-auto">
            {summaryData.stage2?.feedback?.comments?.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </section>
        {/* Stage 3 */}
        <section className="flex-1 flex flex-col items-center justify-start gap-4 min-w-[220px]">
          <FaLightbulb className="text-cyan-500 text-5xl mb-2" />
          <h2 className="text-3xl font-bold text-cyan-100 mb-2">Stage 3</h2>
          <div className="text-cyan-100 font-mono text-xl">Incorrect Approaches:</div>
          <div className="text-cyan-200 font-extrabold text-3xl mb-4">{summaryData.stage3?.incorrectApproaches ?? 0}</div>
        </section>
        {/* Stage 4 */}
        <section className="flex-1 flex flex-col items-center justify-start gap-4 min-w-[260px]">
          <FaCode className={hasCodingErrors ? "text-red-500 text-5xl mb-2" : "text-green-500 text-5xl mb-2"} />
          <h2 className="text-3xl font-bold text-cyan-100 mb-2">Stage 4</h2>
          <div className="text-cyan-200 font-semibold text-lg mb-1">Coding Errors</div>
          {summaryData.stage4?.codingErrors?.length && hasCodingErrors ? (
            <div className="max-h-56 overflow-y-auto w-full px-2">
              <ul className="list-disc pl-5 text-red-700 text-base">
                {summaryData.stage4.codingErrors.filter(e => e.errorMessages && e.errorMessages.length).map(({ approachIdx, errorMessages }) => (
                  <li key={approachIdx} className="mb-2">
                    <b>Approach {approachIdx + 1}:</b>
                    <ul className="list-disc pl-5">
                      {errorMessages.map((msg, i) => <li key={i} className="break-words">{msg}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="italic text-green-600 text-lg">No coding errors. Great job!</div>
          )}
        </section>
      </div>
      {/* Divider */}
      <div className="w-full border-t border-cyan-400/30 my-12"></div>
      {/* Vertical Action Buttons Column (left side, only on large screens) */}
      <div className="hidden lg:flex flex-col fixed top-1/2 -translate-y-1/2 left-0 z-30 gap-4 px-3 py-6 bg-gradient-to-b from-cyan-950/90 via-gray-900/80 to-transparent rounded-r-2xl shadow-xl border-r border-cyan-400/30">
        <button onClick={handleRetake} className="px-4 py-3 rounded-xl bg-cyan-400 text-white font-bold flex items-center gap-2 shadow-lg hover:bg-cyan-500 transition text-base"><FaRedo /> Retake</button>
        <button  className="px-4 py-3 rounded-xl bg-white border border-cyan-400 text-cyan-500 font-bold flex items-center gap-2 shadow hover:bg-cyan-50 transition text-base"><FaDownload /> Download</button>
        <button className="px-4 py-3 rounded-xl bg-white border border-cyan-400 text-cyan-500 font-bold flex items-center gap-2 shadow hover:bg-cyan-50 transition text-base"><FaShareAlt /> Share</button>
      </div>
      {/* Add left padding to main content on large screens so it doesn't overlap the button column */}
      <style>{`@media (min-width: 1024px) {.summary-main-content { padding-left: 90px; }}`}</style>
    </div>
  );
}