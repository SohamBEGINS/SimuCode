import { SignedIn, SignedOut, RedirectToSignIn, useUser, UserButton } from "@clerk/clerk-react";

export default function Dashboard() {
  const { user ,isSignedIn,isLoaded} = useUser();
  if(!isLoaded)
  {
    return <div>Loading...</div>
  }
  if(!isSignedIn)
  {
    return <div>Sign in to view this page</div>;
  }
  return (
    <>
      <SignedIn>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-3">
            {user && (
              <span className="text-lg font-semibold text-cyan-600">
                Welcome, {user.firstName || user.username || user.emailAddress}
              </span>
            )}
            <UserButton/>
          </div>
        </div>
        {/* Add your form for question difficulty and duration here */}
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
          <button type="submit" className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded">Start Interview</button>
        </form>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}