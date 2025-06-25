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

export default function DashboardNavbar({ unlockedStages = ["dashboard"], onNav }) {
  return (
    <nav className="w-full z-50 bg-black/80 backdrop-blur border-b border-cyan-400/20 shadow-md rounded-t-2xl">
      <div className="max-w-5xl mx-auto flex items-center px-6 py-4 space-x-6">
        {/* Navigation buttons */}
        {stages.map((stage) => (
          <button
            key={stage.key}
            onClick={() => onNav && onNav(stage.key)}
            disabled={!unlockedStages.includes(stage.key)}
            className={`uppercase text-lg font-semibold px-4 py-2 rounded-full transition
              ${
                unlockedStages.includes(stage.key)
                  ? "text-cyan-300 border border-cyan-300 hover:bg-cyan-300 hover:text-black"
                  : "text-gray-500 border border-gray-700 cursor-not-allowed opacity-50"
              }
              bg-transparent duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-200`}
          >
            {stage.label}
          </button>
        ))}
        {/* UserButton aligned right, bigger, black background, circular */}
        <div className="ml-auto flex items-center">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center border-2 border-cyan-300 shadow-lg">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: " h-16", // bigger avatar
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}