import { SignedIn , SignedOut , RedirectToSignIn } from "@clerk/clerk-react";

export default function Dashboard() {
  return (
    <>
      <SignedIn>
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
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