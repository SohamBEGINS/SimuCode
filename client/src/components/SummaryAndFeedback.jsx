import React from "react";
// import Confetti from "react-confetti"; // Uncomment if using confetti

export default function SummaryAndFeedback({ summaryData }) {
  // Example: summaryData = { stage1: {...}, stage2: {...}, stage3: {...}, stage4: {...} }

  // Example creative positions for cards (customize as you like)
  const cardStyles = [
    { top: "60px", left: "10vw", transform: "rotate(-3deg)" },   // Stage 1
    { top: "120px", left: "50vw", transform: "rotate(2deg)", zIndex: 2 }, // Stage 2 (bigger/prominent)
    { top: "260px", left: "25vw", transform: "rotate(4deg)" },   // Stage 3
    { top: "200px", left: "70vw", transform: "rotate(-2deg)" },  // Stage 4
  ];

  return (
    <div className="relative min-h-[600px] w-full py-12">
      {/* <Confetti /> */}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-cyan-200 drop-shadow-lg">🎉 Summary & Feedback</h1>
      <div className="relative w-full h-[500px]">
        {/* Stage 1 Card */}
        <div className="absolute bg-white/90 shadow-xl rounded-2xl p-6 w-72" style={cardStyles[0]}>
          <h2 className="text-xl font-bold text-cyan-700 mb-2">Stage 1: Question</h2>
          <p className="text-cyan-900 font-mono">Incorrect Attempts: <b>{summaryData.stage1?.incorrectAttempts ?? 0}</b></p>
        </div>
        {/* Stage 2 Card */}
        <div className="absolute bg-cyan-100 shadow-2xl rounded-2xl p-8 w-96 border-2 border-cyan-400" style={cardStyles[1]}>
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
        {/* Stage 3 Card */}
        <div className="absolute bg-white/90 shadow-xl rounded-2xl p-6 w-72" style={cardStyles[2]}>
          <h2 className="text-xl font-bold text-cyan-700 mb-2">Stage 3: Approach</h2>
          <p className="text-cyan-900 font-mono">Incorrect Approaches: <b>{summaryData.stage3?.incorrectApproaches ?? 0}</b></p>
        </div>
        {/* Stage 4 Card */}
        <div className="absolute bg-white/90 shadow-xl rounded-2xl p-6 w-80" style={cardStyles[3]}>
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
      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-16">
        <button className="px-6 py-2 rounded-full bg-cyan-500 text-white font-bold shadow hover:bg-cyan-600 transition">Retake</button>
        <button className="px-6 py-2 rounded-full bg-purple-500 text-white font-bold shadow hover:bg-purple-600 transition">Download</button>
        <button className="px-6 py-2 rounded-full bg-blue-500 text-white font-bold shadow hover:bg-blue-600 transition">Share</button>
        <button className="px-6 py-2 rounded-full bg-gray-700 text-white font-bold shadow hover:bg-gray-800 transition">Dashboard</button>
      </div>
    </div>
  );
}