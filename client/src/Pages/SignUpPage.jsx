import { SignUp ,useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
export default function SignUpPage() {
  const {isSignedIn} = useUser();
    if(isSignedIn)
    {
        return <Navigate to ="/dashboard"/>
    }
  
    return (

    <div className="min-h-screen flex items-center justify-center py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 animate-gradient bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-gray-900 opacity-80" />
      
      <div className="relative z-10 flex w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden border-2 border-white/20 backdrop-blur-2xl bg-white/5">
       
        <div className="w-2 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-lg" />
        
        <div className="flex-1 bg-black/40 backdrop-blur-lg p-14 flex items-center justify-center border-r border-white/10">
          <SignUp routing="path" path="/sign-up" forceRedirectUrl="/dashboard" />
        </div>
       
        <div className="flex-1 bg-black/30 backdrop-blur-lg p-14 flex flex-col items-center justify-center">
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-center tracking-tight leading-tight mb-4 font-sans">
            Start Your Interview Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full mb-0" />
        </div>
      </div>
    </div>
  );
}