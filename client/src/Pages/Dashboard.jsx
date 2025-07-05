import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import StellarBackground from "../components/StellarBackground";
import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import TerminalShell from "@/components/TerminalShell";
import DifficultySelection from "@/components/DifficultySelection";
import QuestionListeningStage from "@/components/QuestionListeningStage";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-12 w-12 text-cyan-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <span className="text-cyan-200 text-xl font-semibold">Loading your dashboard...</span>
      </div>
    </div>
  );
}

function SignInPrompt() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-cyan-700">Sign In Required</h2>
        <p className="text-gray-700 mb-6 text-center">
          Please sign in to access your dashboard and interview features.
        </p>
        <button
          className="px-6 py-3 bg-cyan-500 text-white rounded-full font-semibold text-lg shadow hover:bg-cyan-600 transition"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [unlockedStages, setUnlockedStages] = useState(["dashboard"]);
  const [difficulty, setDifficulty] = useState(null);
  const [currentStage, setCurrentStage] = useState("difficulty-selection"); // "difficulty-selection" | "question-listening"
  const [interviewStarted, setInterviewStarted] = useState(false);
  // Add some debugging
  console.log("Dashboard loading state:", { isLoaded, isSignedIn, user });

  if (!isLoaded) {
    return (
      <>
        <StellarBackground />
        <LoadingOverlay />
      </>
    );
  }
  if (!isSignedIn) {
    return (
      <>
        <StellarBackground />
        <SignInPrompt />
      </>
    );
  }

  // welcome message
  const topContent = (
    <div className={cn(
      "text-center mb-12 transition-all duration-700 ease-in-out",
      interviewStarted 
        ? "opacity-0 transform -translate-y-8 pointer-events-none" 
        : "opacity-100 transform translate-y-0"
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text mb-2",
        "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300",
        "drop-shadow-2xl tracking-tight"
      )}>
        Welcome {user?.firstName || user?.username || "Coder"}
      </h2>
      <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full mx-auto mb-3"></div>
      <p className="text-cyan-100/80 text-base md:text-lg font-light max-w-xl mx-auto">
        Ready to take on your coding challenge? Let's get started!
      </p>
    </div>
  );
  //STAGE 1 ------------------------------------------------------------

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentStage("question-listening");
    setInterviewStarted(true);
     // NEW: Add Stage 1 to unlocked stages
  setUnlockedStages(prev => {
    if (!prev.includes("stage1")) {
      return [...prev, "stage1"];
    }
    return prev;
  });

  };

  const handleQuestionComplete = (result) => {
    console.log("Question completed:", result);
    // TODO: Add semantic similarity scoring here
    // For now, just show success and move to next stage
    alert("Question submitted! (Scoring will be implemented next)");
    // You can add logic here to move to Stage 2
  };

  

  const getStageContent = () => {
    switch (currentStage) {
      case "difficulty-selection":
        return <DifficultySelection onSelect={handleDifficultySelect} />;
      case "question-listening":
        return (
          <QuestionListeningStage
            difficulty={difficulty}
            onComplete={handleQuestionComplete}
            onBack={null}
          />
        );
      default:
        return <DifficultySelection onSelect={handleDifficultySelect} />;
    }
  };

  const getStageProgress = () => {
    switch (currentStage) {
      case "difficulty-selection":
        return <span className="text-cyan-300 font-semibold">Step 1 of 5</span>;
      case "question-listening":
        return <span className="text-green-300 font-semibold">Step 2 of 5</span>;
      default:
        return <span className="text-cyan-300 font-semibold">Step 1 of 5</span>;
    }
  };

  const getStageTitle = () => {
    switch (currentStage) {
      case "difficulty-selection":
        return "Interview Setup";
      case "question-listening":
        return "Question Listening Stage";
      default:
        return "Interview Setup";
    }
  };

  return (
    <>
      <SignedIn>
        <div className="animate-fade-in">
          <StellarBackground />
          <div className="relative h-screen flex flex-col">
            <DashboardNavbar 
              unlockedStages={unlockedStages} 
              currentStage={currentStage}
              onNav={(stage) => { console.log("Navigation to:", stage); }} 
            />
            
            <div className={cn(
              "flex-1 flex flex-col px-4 pb-4 mt-16 overflow-hidden transition-all duration-700 ease-in-out",
              interviewStarted ? "pt-4" : "pt-8" // NEW: Reduce top padding when interview starts
            )}>
              <div className={cn(
                "flex-shrink-0 transition-all duration-700 ease-in-out",
                interviewStarted ? "h-0 overflow-hidden" : "h-auto"
              )}>
                {topContent}
              </div>
              <div className={cn(
                "flex-1 flex items-center justify-center transition-all duration-700 ease-in-out",
                interviewStarted ? "transform -translate-y-8" : "transform translate-y-0"
              )}>
                <TerminalShell
                  title={getStageTitle()}
                  progress={getStageProgress()}
                  footer={null}
                  className={cn(
                    "transition-all duration-700 ease-in-out",
                    interviewStarted ? "scale-105" : "scale-100" // NEW: Make terminal bigger
                  )}
                >
                  {getStageContent()}
                </TerminalShell>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}