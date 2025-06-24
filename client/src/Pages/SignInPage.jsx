import { SignIn , useUser } from "@clerk/clerk-react";
import {Navigate} from "react-router-dom"

export default function SignInPage() {

    const {isSignedIn} = useUser();
    if(isSignedIn)
    {
        return <Navigate to ="/dashboard"/>
    }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <SignIn routing="path" path="/login" forceRedirectUrl="/dashboard" />
    </div>
  );
}