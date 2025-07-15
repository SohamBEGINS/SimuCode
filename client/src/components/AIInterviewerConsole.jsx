// ... existing imports ...
import React from 'react';

export default function AIInterviewerConsole({
  verdict,
  feedback,
  suggestion,
  canProceed,
  onProceed
}) {
  return (
    <div className="terminal-section h-full flex flex-col">
      <div className="terminal-section-header">
        <span className="text-cyan-400 font-mono"> AI INTERVIEWER CONSOLE</span>
      </div>
      <div className="terminal-section-content flex-1 flex flex-col">
        {/* Show latest AI feedback/verdict after each submission */}
        {verdict && (
          <div className="mb-4">
            
            <div className="font-mono text-cyan-200">
              <strong>Feedback:</strong> {feedback}
            </div>
            <div className="font-mono text-cyan-100">
              <strong>Suggestion:</strong> {suggestion}
            </div>
          </div>
        )}
        {/* Show proceed message if allowed */}
        {canProceed && (
          <>
            <div className="status-message mt-4 p-3 bg-green-500/20 border border-green-400/30 rounded-md flex flex-col items-center">
              <div className="text-green-300 font-mono text-sm text-center">
                You can proceed to the coding stage or try to  follow suggestion
              </div>
            </div>
            <div className="flex justify-center w-full">
              <button
                className="px-3 py-1 mt-6 bg-transparent border border-cyan-400 text-cyan-300 rounded-full font-mono text-sm hover:bg-cyan-900 hover:text-white transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
                style={{ fontWeight: 500 }}
                onClick={onProceed}
              >
                Proceed to Coding
              </button>
            </div>
          </>
        )}
        {/* Empty state */}
        {!verdict && (
          <div className="empty-state text-center text-gray-400 mt-8">
            <div className="font-mono">
              Submit an approach to begin the interview...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}