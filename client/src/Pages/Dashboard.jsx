import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import StellarBackground from "../components/StellarBackground";
import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";

function SignInPrompt() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    return (
      <>
        <StellarBackground />
        <SignInPrompt />
      </>
    );
  }
  return (
    <>
      <SignedIn>
        <StellarBackground />
        <div className="relative min-h-screen flex flex-col items-center">
          <DashboardNavbar unlockedStages={unlockedStages} onNav={(stage) => { /* handle nav */ }} />
          <div className="w-full flex flex-col items-center mt-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-cyan-400 drop-shadow-lg mb-8 tracking-tight">
              Welcome, {user.firstName || user.username || user.emailAddress}
            </h2>
            <div className="w-full max-w-3xl bg-white/10 border border-cyan-400/20 rounded-3xl shadow-2xl backdrop-blur-lg p-10">
              {/* Place your dashboard content here */}
              <form>
                <label>
                  Difficulty:
                  <select className="ml-2">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </label>
                <br />
                <label>
                  Duration (minutes):
                  <input type="number" min="10" max="120" className="ml-2" />
                </label>
                <br />
                <button type="submit" className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded">
                  Start Interview
                </button>
              </form>
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