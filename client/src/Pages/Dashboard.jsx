import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import StellarBackground from "../components/StellarBackground";
import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import TerminalShell from "@/components/TerminalShell";
import DifficultySelection from "@/components/DifficultySelection";
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
    <div className="text-center mb-12">
      <h2 className={cn(
        "text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text mb-2",
        "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300",
        "drop-shadow-2xl tracking-tight"
      )}>
        Welcome {user?.firstName || user?.username || "Coder"}
      </h2>
      <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full mx-auto mb-3"></div>
      <p className="text-cyan-100/80 text-base md:text-lg font-light max-w-xl mx-auto">
        Ready to take on your  coding challenge? Let's get started!
      </p>
    </div>
  );

  return (
    <>
      <SignedIn>
        <div className="animate-fade-in">
          <StellarBackground />
          <div className="relative h-screen flex flex-col">
            <DashboardNavbar 
              unlockedStages={unlockedStages} 
              onNav={(stage) => { console.log("Navigation to:", stage); }} 
            />
            
            <div className="flex-1 flex flex-col px-4 pt-8 pb-4 mt-16 overflow-hidden">
              <div className="flex-shrink-0">
                {topContent}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <TerminalShell
                  title={!difficulty ? "Interview Setup" : "Interview Stage"}
                  progress={
                    !difficulty
                      ? <span className="text-cyan-300 font-semibold">Step 1 of 5</span>
                      : <span className="text-green-300 font-semibold">Step 2 of 5</span>
                  }
                  footer={null}
                >
                  {!difficulty ? (
                    <DifficultySelection onSelect={setDifficulty} />
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-center mb-8">
                        <h3 className={cn(
                          "text-3xl font-bold text-transparent bg-clip-text mb-4",
                          "bg-gradient-to-r from-green-300 via-cyan-300 to-blue-300",
                          "drop-shadow-lg tracking-tight"
                        )}>
                          <span className="capitalize">{difficulty}</span> Challenge Selected
                        </h3>
                        <p className="text-cyan-100/70 text-lg mb-6">Prepare yourself for the interview ahead</p>
                      </div>
                      <div className="text-cyan-100 text-2xl mb-6">
                        🚀 Get ready for your <span className="capitalize font-bold text-cyan-300">{difficulty}</span> interview!
                      </div>
                      <p className="text-cyan-100/70 text-lg mb-8">
                        Your coding challenge is about to begin. Take a deep breath and showcase your skills.
                      </p>
                      <Button 
                        className={cn(
                          "px-8 py-4 text-lg font-bold rounded-xl",
                          "bg-gradient-to-r from-green-500 to-emerald-500",
                          "hover:from-green-400 hover:to-emerald-400",
                          "shadow-xl shadow-green-500/25 transition-all duration-300 hover:scale-105"
                        )}
                      >
                        Begin Challenge
                      </Button>
                    </div>
                  )}
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