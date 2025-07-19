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
      <div className="flex flex-row justify-center items-start gap-16 w-full max-w-[1800px]">
        {/* Stage 2 Card (left) */}
        <div className="bg-cyan-100/90 shadow-2xl rounded-2xl p-8 w-[420px] max-w-[600px] min-h-[180px] border-2 border-cyan-400 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-3 mb-2">
            <FaQuestionCircle className="text-cyan-700 text-2xl" />
            <h2 className="text-2xl font-extrabold text-cyan-800">Stage 2: Clarification</h2>
          </div>
          <div className="mb-2">
            <div className="font-semibold text-cyan-700">Your Clarifications:</div>
            <ul className="list-disc pl-5 text-cyan-900">
              {summaryData.stage2?.clarifications?.length
                ? summaryData.stage2.clarifications.map((q, i) => <li key={i}>{q}</li>)
                : <li className="italic text-cyan-400">No clarifications asked.</li>
              }
            </ul>
          </div>
          <div>
            <div className="font-semibold text-cyan-700">AI Feedback:</div>
            <div className="text-cyan-900">
              <b>Quality:</b> {summaryData.stage2?.feedback?.quality || "N/A"}
              <ul className="list-disc pl-5">
                {summaryData.stage2?.feedback?.comments?.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
        {/* Right side: Stack Stage 1, 3, 4 vertically */}
        <div className="flex flex-col gap-10">
          {/* Stage 1 Card */}
          <div className="bg-white/90 shadow-xl rounded-2xl p-6 w-[380px] max-w-[500px] min-h-[80px] border-l-4 border-cyan-400 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-1">
              <FaLightbulb className="text-yellow-400 text-xl" />
              <h2 className="text-xl font-bold text-cyan-700">Stage 1: Question</h2>
            </div>
            <p className="text-cyan-900 font-mono">Incorrect Attempts: <b>{summaryData.stage1?.incorrectAttempts ?? 0}</b></p>
          </div>
          {/* Stage 3 Card */}
          <div className="bg-white/90 shadow-xl rounded-2xl p-6 w-[380px] max-w-[500px] min-h-[80px] border-l-4 border-cyan-400 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-1">
              <FaLightbulb className="text-cyan-500 text-xl" />
              <h2 className="text-xl font-bold text-cyan-700">Stage 3: Approach</h2>
            </div>
            <p className="text-cyan-900 font-mono">Incorrect Approaches: <b>{summaryData.stage3?.incorrectApproaches ?? 0}</b></p>
          </div>
          {/* Stage 4 Card */}
          <div className={`shadow-xl rounded-2xl p-6 w-[420px] max-w-[600px] min-h-[100px] border-l-4 ${hasCodingErrors ? "border-red-400 bg-red-50/80" : "border-green-400 bg-white/90"} hover:scale-105 transition-transform duration-300`}>
            <div className="flex items-center gap-2 mb-1">
              <FaCode className={hasCodingErrors ? "text-red-500 text-xl" : "text-green-500 text-xl"} />
              <h2 className="text-xl font-bold text-cyan-700">Stage 4: Coding</h2>
            </div>
            <div className="font-mono text-cyan-900 mb-2">Coding Errors:</div>
            {summaryData.stage4?.codingErrors?.length && hasCodingErrors ? (
              <ul className="list-disc pl-5 text-cyan-900">
                {summaryData.stage4.codingErrors.filter(e => e.errorMessages && e.errorMessages.length).map(({ approachIdx, errorMessages }) => (
                  <li key={approachIdx} className="mb-2">
                    <b>Approach {approachIdx + 1}:</b>
                    <ul className="list-disc pl-5">
                      {errorMessages.map((msg, i) => <li key={i} className="text-red-700">{msg}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="italic text-green-600">No coding errors. Great job!</div>
            )}
          </div>
        </div>
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