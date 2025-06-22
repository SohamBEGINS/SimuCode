import TypewriterText from "./TypewriterText";
// import TypeWriterEffect from "react-typewriter-effect";

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 md:px-12 py-12">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
        {/* Left Content */}
        <div className="flex-[3] max-w-3xl text-center md:text-left">
          <h1 className="text-white font-extrabold text-[3.5rem] md:text-[5rem] leading-tight mb-2 drop-shadow-xl font-sans">
            Simulate Real Coding
            <div className="mb-8 inline-block">
            <span className="inline-bloc px-6 py-2 font-bold text-white text-[4.5rem] md:text-[5rem] shadow-lg">
              <TypewriterText />
            </span>
          
          </div>
          </h1>
          <p className="italic text-white text-lg md:text-2xl mb-10 drop-shadow">
            Practice, Learn, and Succeed in Tech Interviews by simulating real-time pressure environments.
          </p>
          <div className="text-center">
          <button
            className="mt-6 px-10 py-6 rounded-full text-3xl font-bold shadow-[0_0_32px_8px_rgba(34,211,238,0.7)] transition duration-200 hover:shadow-[0_0_48px_16px_rgba(34,211,238,0.9)] focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Create Account
          </button>
          </div>
        </div>
        {/* Right Card */}
        
      </div>
    </section>
  );
};

export default Hero;
