import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import StellarBackground from "../components/StellarBackground";
import { useState , useEffect } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import TerminalShell from "@/components/TerminalShell";
import DifficultySelection from "@/components/DifficultySelection";
import QuestionListeningStage from "@/components/QuestionListeningStage";
import ClarificationStage from "@/components/ClarificationStage"; // Added ClarificationStage import
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Stage3ApproachAnalysis  from "@/components/Stage3ApproachAnalysis";
import Stage4CodingRound from "@/components/Stage4CodingRound";
import SummaryAndFeedback from "@/components/SummaryAndFeedback";

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
  const [currentStage, setCurrentStage] = useState("difficulty-selection");
  const [showLoader, setShowLoader] = useState(false); // Add loader state
  const [stage1Question, setStage1Question] = useState(""); // Store question for Stage 2
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [stage3Approaches, setStage3Approaches] = useState([]);
  const [summaryData, setSummaryData] = useState({
    stage1: {},
    stage2: {},
    stage3: {},
    stage4: {}
  });
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
     // Update summaryData for stage 1
  setSummaryData(prev => ({
    ...prev,
    stage1: {
      incorrectAttempts: result.incorrectAttempts // <-- Make sure this is passed from the child!
    }
  }));
    

    if (result.evaluation === "positive") {
      setUnlockedStages(prev => {
        if (!prev.includes("stage2")) {
          return [...prev, "stage2"];
        }
        return prev;
      });
      // Save the question for Stage 2 (from the first user message in chat)
      const userQuestion = result.chat && result.chat.length > 0 ? result.chat[0].message : "";
      setStage1Question(userQuestion);
      // Wait for 2.5 seconds so user can read the feedback in the chat
      setTimeout(() => {
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          setCurrentStage("clarification");
        }, 1500); // 1.5 seconds loader/transition
      }, 5500); // 2.5 seconds to let user read feedback
    }
  };


  

  const handleProceedToStage3 = async (clarifications) => {

    let feedback = null;
    if (clarifications.length > 0) {
      const res = await fetch('/api/interview-summary/clarification-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: stage1Question,
          clarifications,
          difficulty
        })
      });
      feedback = await res.json();
    } else {
      // Handle the edge case: no clarifications
      feedback = {
        quality: "None",
        comments: [
          "No clarifying questions were asked. In real interviews, it's often helpful to clarify constraints, edge cases, or input/output details."
        ]
      };
    }
  
    // Store in summaryData
    setSummaryData(prev => ({
      ...prev,
      stage2: {
        clarifications,
        feedback
      }
    }));

    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      setUnlockedStages(prev => {
        if (!prev.includes("stage3")) {
          return [...prev, "stage3"];
        }
        return prev;
      });
      setCurrentStage("stage3");
    }, 1500); // 1.5 seconds loader/transition
  };

  // 6. Handle completion of Stage 3 (e.g., move to Stage 4)
const handleProceedToStage4 = (approaches , incorrectApproaches) => {
  
  setStage3Approaches(approaches);
  setSummaryData(prev => ({
    ...prev,
    stage3: { incorrectApproaches }
  }));
  setShowLoader(true);
  setTimeout(() => {
    setShowLoader(false);
    setUnlockedStages(prev => {
      if (!prev.includes("stage4")) {
        return [...prev, "stage4"];
      }
      return prev;
    });
    setCurrentStage("stage4");
  }, 1500);
};

const handleFinishStage4 = (codingErrors) => {
  setSummaryData(prev => ({
    ...prev,
    stage4: { codingErrors }
  }));
  setShowLoader(true);
  setTimeout(() => {
    setShowLoader(false);
    setUnlockedStages(prev => {
      if (!prev.includes("summary")) {
        return [...prev, "summary"];
      }
      return prev;
    });
    setCurrentStage("summary");
  }, 1500);
};

  const getStageContent = () => {
    if (showLoader) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin h-12 w-12 text-cyan-400 mb-4 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
          <p className="text-cyan-300 text-lg">Preparing next stage...</p>
        </div>
      );
    }
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
      case "clarification":
        return (
          <ClarificationStage
            question={stage1Question}
            difficulty={difficulty}
            onProceed={handleProceedToStage3}
          />
        );
      case "stage3":
        return (
          <Stage3ApproachAnalysis
            question={stage1Question}
            difficulty={difficulty}
            onStageComplete={handleProceedToStage4}
          />
        );
        case "stage4":
          return (
            <Stage4CodingRound
              approaches={stage3Approaches}
              question={stage1Question}
              difficulty={difficulty}
              onFinish={handleFinishStage4}
            />
          );
        
          case "summary":
            return <SummaryAndFeedback summaryData={summaryData} />;

      default:
        return <DifficultySelection onSelect={handleDifficultySelect} />;
    }
  };

  const getStageProgress = () => {
    switch (currentStage) {
      case "difficulty-selection":
        return <span className="text-cyan-300 font-semibold">Step 0 of 5</span>;
      case "question-listening":
        return <span className="text-green-300 font-semibold">Step 1 of 5</span>;
      case "clarification":
        return <span className="text-green-300 font-semibold">Step 2 of 5</span>;
        case "stage3":
          return <span className="text-green-300 font-semibold">Step 3 of 5</span>;
        case "stage4":
          return <span className="text-green-300 font-semibold">Step 4 of 5</span>;
        
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
      case "clarification":
        return "Clarification Stage";
      case "stage3":
        return "Approach Analysis Stage"
      case "stage4":
        return "Coding  Stage"
      case "summary&Feedback":
        return "Summary And Feedback"
      
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
              currentStage={currentStage === "summary" ? "summary&feedback" : currentStage}
              onNav={(stage) => { console.log("Navigation to:", stage); }} 
            />
            {currentStage === "summary" ? (
              <div className="flex-1 flex flex-col px-4 pb-4 mt-16 overflow-hidden transition-all duration-700 ease-in-out">
                <SummaryAndFeedback summaryData={summaryData} />
              </div>
            ) : (
              <div className={cn(
                "flex-1 flex flex-col px-4 pb-4 mt-16 overflow-hidden transition-all duration-700 ease-in-out",
                interviewStarted ? "pt-4" : "pt-8"
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
                      interviewStarted ? "scale-105" : "scale-100"
                    )}
                  >
                    {getStageContent()}
                  </TerminalShell>
                </div>
              </div>
            )}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}