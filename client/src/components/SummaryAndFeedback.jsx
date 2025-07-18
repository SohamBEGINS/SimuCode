import React from "react";
// import Confetti from "react-confetti"; // Uncomment if using confetti

export default function SummaryAndFeedback({ summaryData }) {
  // Example: summaryData = { stage1: {...}, stage2: {...}, stage3: {...}, stage4: {...} }

  // Centered layout: Stage 2 on the left, others stacked vertically to the right
  const cardStyles = [
    {}, // Stage 1 (no absolute positioning)
    {}, // Stage 2
    {}, // Stage 3
    {}, // Stage 4
  ];

  return (
    <div className="relative min-h-[600px] w-full py-12 flex flex-col items-center justify-center">
      {/* <Confetti /> */}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-cyan-200 drop-shadow-lg"> Summary & Feedback</h1>
      <div className="flex flex-row justify-center items-center gap-24 w-full max-w-[1800px]">
        {/* Stage 2 Card (left) */}
        <div className="bg-cyan-100 shadow-2xl rounded-2xl p-8 w-[600px] max-w-[900px] min-h-[120px] border-2 border-cyan-400">
          <h2 className="text-2xl font-extrabold text-cyan-800 mb-2">Stage 2: Clarification</h2>
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
        <div className="flex flex-col gap-12">
          {/* Stage 1 Card */}
          <div className="bg-white/90 shadow-xl rounded-2xl p-6 w-[480px] max-w-[700px] min-h-[80px]">
            <h2 className="text-xl font-bold text-cyan-700 mb-2">Stage 1: Question</h2>
            <p className="text-cyan-900 font-mono">Incorrect Attempts: <b>{summaryData.stage1?.incorrectAttempts ?? 0}</b></p>
          </div>
          {/* Stage 3 Card */}
          <div className="bg-white/90 shadow-xl rounded-2xl p-6 w-[480px] max-w-[700px] min-h-[80px]">
            <h2 className="text-xl font-bold text-cyan-700 mb-2">Stage 3: Approach</h2>
            <p className="text-cyan-900 font-mono">Incorrect Approaches: <b>{summaryData.stage3?.incorrectApproaches ?? 0}</b></p>
          </div>
          {/* Stage 4 Card */}
          <div className="bg-white/90 shadow-xl rounded-2xl p-6 w-[520px] max-w-[800px] min-h-[100px]">
            <h2 className="text-xl font-bold text-cyan-700 mb-2">Stage 4: Coding</h2>
            <div className="font-mono text-cyan-900 mb-2">Coding Errors:</div>
            {summaryData.stage4?.codingErrors?.length ? (
              <ul className="list-disc pl-5 text-cyan-900">
                {summaryData.stage4.codingErrors.map(({ approachIdx, errorMessages }) => (
                  <li key={approachIdx}>
                    <b>Approach {approachIdx + 1}:</b>
                    <ul className="list-disc pl-5">
                      {errorMessages.map((msg, i) => <li key={i}>{msg}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="italic text-cyan-400">No coding errors.</div>
            )}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-12">
        <button className="px-6 py-2 rounded-full bg-transparent border border-cyan-400 text-cyan-500 font-semibold hover:bg-cyan-50 transition">Retake</button>
        <button className="px-6 py-2 rounded-full bg-transparent border border-cyan-400 text-cyan-500 font-semibold hover:bg-cyan-50 transition">Download</button>
        <button className="px-6 py-2 rounded-full bg-transparent border border-cyan-400 text-cyan-500 font-semibold hover:bg-cyan-50 transition">Share</button>
        <button className="px-6 py-2 rounded-full bg-transparent border border-cyan-400 text-cyan-500 font-semibold hover:bg-cyan-50 transition">Dashboard</button>
      </div>
    </div>
  );
}