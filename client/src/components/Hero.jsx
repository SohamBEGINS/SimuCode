import TypewriterText from "./TypewriterText";
import TiltedCard from "../styles/TiltedCard";

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-4 md:px-12 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-12 md:gap-20">
        {/* Left Content */}
        <div className="flex-[3] max-w-3xl text-left">
          <h1 className="text-white font-extrabold text-[3.5rem] md:text-[5rem] leading-tight mb-2 drop-shadow-xl font-sans">
            Simulate Real<br />Coding
          </h1>
          <div className="mb-8">
            <span className="inline-block bg-cyan-400 px-6 py-2 rounded-xl font-bold text-black text-[2.5rem] md:text-[3.5rem] shadow-lg">
              <TypewriterText />
            </span>
          </div>
          <p className="italic text-white text-lg md:text-2xl mb-10 drop-shadow">
            Practice, Learn, and Succeed in Tech Interviews by simulating real-time pressure environments.
          </p>
          <button
            className="mt-8 px-16 py-7 rounded-full text-3xl font-extrabold text-white bg-cyan-400 shadow-[0_0_32px_8px_rgba(34,211,238,0.7)] transition duration-200 hover:bg-cyan-300 hover:shadow-[0_0_48px_16px_rgba(34,211,238,0.9)] focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Start Interview
          </button>
        </div>
        {/* Right Card */}
        <div className="flex-[2] flex justify-center md:justify-end w-full md:w-auto">
          <div className="relative">
            <TiltedCard
              imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
              containerHeight="420px"
              containerWidth="420px"
              imageHeight="420px"
             imageWidth="420px"
             rotateAmplitude={7}
             scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={true}
              className="rounded-2xl border-2 border-white/80 shadow-lg bg-black/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
