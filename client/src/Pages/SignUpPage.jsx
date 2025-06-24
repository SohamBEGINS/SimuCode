import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="flex w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden">
        {/* Left: SignUp with black glassmorphism */}
        <div className="flex-1 bg-black/30 backdrop-blur-sm p-10 flex items-center justify-center">
          <SignUp routing="path" path="/sign-up" forceRedirectUrl="/dashboard" />
        </div>
        {/* Right: Modern text with black glassmorphism */}
        <div className="flex-1 bg-black/30 backdrop-blur-sm p-10 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-white mb-4 text-center drop-shadow-lg">
            Sign up to get started
          </h2>
          <p className="text-lg text-gray-200 text-center">
            Create your account and begin your simulated coding interview journey.
            Unlock personalized questions, track your progress, and prepare for
            success!
          </p>
        </div>
      </div>
    </div>
  );
}