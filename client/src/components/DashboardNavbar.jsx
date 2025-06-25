import { useUser, UserButton } from "@clerk/clerk-react";


const stages = [
  { key: "dashboard", label: "Dashboard" },
  { key: "stage1", label: "Stage 1" },
  { key: "stage2", label: "Stage 2" },
  { key: "stage3", label: "Stage 3" },
  { key: "stage4", label: "Stage 4" },
  { key: "summary", label: "Summary" },
  { key: "feedback", label: "Feedback" },
];

export default function DashboardNavbar({ unlockedStages = ["dashboard"], onNav, activeStage = "dashboard" }) {
  return (
    <nav className="w-full z-50 bg-black/70 bg-opacity-80 backdrop-blur-xl border-b border-cyan-400/20 shadow-lg rounded-t-2xl">
      <div className="max-w-6xl mx-auto flex items-center px-8 py-5 space-x-8">
        {/* Logo */}
        <div className="flex items-center mr-8 select-none">
          <span className="text-3xl font-extrabold tracking-tight text-cyan-300 font-sans drop-shadow-lg">
            <svg width="32" height="32" viewBox="0 0 32 32" className="inline-block mr-2 -mt-1" fill="none">
              <circle cx="16" cy="16" r="16" fill="#22d3ee" fillOpacity="0.25"/>
              <path d="M10 22L16 10L22 22" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            SimuCode
          </span>
        </div>
        {/* Navigation buttons */}
        <div className="flex space-x-2">
          {stages.map((stage) => (
            <button
              key={stage.key}
              onClick={() => onNav && onNav(stage.key)}
              disabled={!unlockedStages.includes(stage.key)}
              className={`uppercase text-base font-semibold px-5 py-2 rounded-full transition-all duration-200
                ${
                  unlockedStages.includes(stage.key)
                    ? (activeStage === stage.key
                        ? "bg-cyan-300 text-black shadow-md border border-cyan-400"
                        : "text-cyan-200 border border-cyan-300 hover:bg-cyan-300 hover:text-black hover:shadow")
                    : "text-gray-500 border border-gray-700 cursor-not-allowed opacity-50"
                }
                bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-cyan-200`}
              style={{
                minWidth: 110,
                letterSpacing: "0.04em"
              }}
            >
              {stage.label}
            </button>
          ))}
        </div>
        {/* UserButton aligned right, bigger, black background, circular */}
        <div className="ml-auto flex items-center">
          <div className="w-14 h-14 bg-black/80 rounded-full flex items-center justify-center border-2 border-cyan-300 shadow-lg transition-all duration-200 hover:scale-105">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10", // bigger avatar
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}