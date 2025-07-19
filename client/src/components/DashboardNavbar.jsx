import { useUser, UserButton } from "@clerk/clerk-react";


const stages = [
  { key: "dashboard", label: "Dashboard" },
  { key: "stage1", label: "Stage 1" },
  { key: "stage2", label: "Stage 2" },
  { key: "stage3", label: "Stage 3" },
  { key: "stage4", label: "Stage 4" },
  { key: "summary&feedback", label: "Summary and feedback" },
  
];

export default function DashboardNavbar({
   unlockedStages = ["dashboard"], 
   onNav,
   currentStage = "difficulty-selection"}) {

    const getActiveStage = () => {
      if (currentStage === "difficulty-selection") return "dashboard";
      if (currentStage === "question-listening") return "stage1";
      if (currentStage === "clarification") return "stage2";
      if (currentStage === "stage3") return "stage3";
      if (currentStage === "stage4") return "stage4";
      if (currentStage === "summary&feedback") return "summary&feedback";
      return "dashboard";
    };
  
    const activeStage = getActiveStage();
  return (
    <nav className="w-full z-50  bg-opacity-80 backdrop-blur-xl border-b border-cyan-400/20 shadow-lg rounded-t-3xl">
      <div className="max-w-10xl mx-auto flex justify-between items-center px-8 py-5 space-x-10">
        {/* Logo */}
        
          <span className="text-3xl font-extrabold tracking-tight text-cyan-300 font-sans drop-shadow-lg">
            
            SimuCode
          </span>
        
        {/* Navigation buttons */}
        <div className="flex space-x-5">
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
        <div className=" flex items-center">
          <div className="w-14 h-14 bg-black/80 rounded-full flex items-center justify-center border-2 border-cyan-300 shadow-lg transition-all duration-200 hover:scale-105">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  // bigger avatar
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}