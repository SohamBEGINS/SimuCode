import React, { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TerminalBox = ({ children }) => (
  <div className="w-full max-w-7xl mx-auto mt-24 mb-24 rounded-2xl border border-cyan-400/20 shadow-2xl overflow-hidden" style={{
    background: "linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(17,24,39,0.92) 100%)"
  }}>
    {/* Terminal header bar */}
    <div className="flex items-center h-12 px-6 bg-gray-900 border-b border-cyan-400/10">
      <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
      <span className="w-3 h-3 rounded-full bg-green-400"></span>
      <span className="ml-4 text-cyan-300 font-mono text-base tracking-wide select-none">simucode@landing:~</span>
    </div>
    <div className="p-12 md:p-20 flex flex-col gap-24 font-mono">{children}</div>
  </div>
);

const howItWorksSteps = [
  {
    title: "Listen & Paraphrase",
    desc: "Hear the question and type what you understood. Practice active listening and comprehension.",
  },
  {
    title: "Clarify & Plan",
    desc: "Ask questions, explain your approach, and get feedback. Sharpen your problem-solving process.",
  },
  {
    title: "Code & Get Feedback",
    desc: "Write code in a realistic environment and receive AI feedback. Iterate and improve your solution.",
  },
];

const howItWorksStages = [
  {
    title: "Stage 1: Listen",
    description: "Carefully listen to the coding problem presented by the AI interviewer.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Stage 2: Clarify",
    description: "Ask clarifying questions to ensure you understand the requirements.",
    imageUrl: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Stage 3: Approach",
    description: "Describe your approach and discuss possible solutions before coding.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Stage 4: Code",
    description: "Write and submit your code. Get instant feedback and iterate.",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Stage 5: Feedback",
    description: "Receive a detailed summary and feedback on your performance.",
    imageUrl: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=600&q=80"
  }
];

const heroMask = {
  WebkitMaskImage:
    "radial-gradient(ellipse 80% 60% at 50% 40%, white 80%, transparent 100%)",
  maskImage:
    "radial-gradient(ellipse 80% 60% at 50% 40%, white 80%, transparent 100%)",
};

const Home = () => {
  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);
  const howItWorksStepRefs = useRef([]);
  const videoRef = useRef(null);
  const codeRef = useRef(null);
  const [currentStage, setCurrentStage] = React.useState(0);
  const autoplayRef = React.useRef();
  const userInteractedRef = React.useRef(false);

  // Autoplay logic for timeline
  React.useEffect(() => {
    if (userInteractedRef.current) return; // Pause if user interacted
    autoplayRef.current = setTimeout(() => {
      setCurrentStage((prev) => (prev + 1) % howItWorksStages.length);
    }, 3000);
    return () => clearTimeout(autoplayRef.current);
  }, [currentStage]);

  // Pause autoplay on user interaction, resume after 5s
  const handleUserInteraction = (idxOrFn) => {
    userInteractedRef.current = true;
    clearTimeout(autoplayRef.current);
    if (typeof idxOrFn === 'number') setCurrentStage(idxOrFn);
    else if (typeof idxOrFn === 'function') setCurrentStage(idxOrFn);
    setTimeout(() => {
      userInteractedRef.current = false;
    }, 5000);
  };

  useEffect(() => {
    // Hero: fade in, slide up, and scale up
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 80, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // How It Works: staggered fade/slide for each step
    if (howItWorksRef.current && howItWorksStepRefs.current.length) {
      gsap.fromTo(
        howItWorksStepRefs.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // Video: fade in, slide up, and gentle rotate
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, y: 80, rotate: -4 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    // Code: fade in and slide up
    if (codeRef.current) {
      gsap.fromTo(
        codeRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: codeRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-0 md:px-4 overflow-hidden w-full">
        <TerminalBox>
          {/* Hero Section */}
          <section ref={heroRef} className="w-full text-center py-20 md:py-32">
            <h1
              className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg font-mono"
              style={heroMask}
            >
              Simulate Real Coding Interviews
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-100 font-light mb-12 font-mono">
              Practice under pressure, clarify doubts, explain your approach, and code your solution — just like a real interview.
            </p>
            <a
              href="/dashboard"
              className="inline-block px-12 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold rounded-lg shadow hover:bg-cyan-300 transition text-2xl font-mono"
            >
              Start Interview
            </a>
          </section>

          {/* How It Works Section (as terminal lines) */}
          <section ref={howItWorksRef} className="w-full flex flex-col items-center py-16 bg-gradient-to-br from-cyan-950 via-gray-900 to-cyan-950 rounded-2xl my-12">
            <h2 className="text-4xl font-extrabold text-cyan-200 mb-10">How It Works</h2>
            <div className="flex flex-row items-center justify-center w-full max-w-5xl">
              {/* Left: Description */}
              <div className="flex-1 pr-8">
                <div className="transition-all duration-500">
                  <h3 className="text-2xl font-bold text-cyan-300 mb-4">{howItWorksStages[currentStage].title}</h3>
                  <p className="text-cyan-100 text-lg">{howItWorksStages[currentStage].description}</p>
                </div>
              </div>
              {/* Center: Timeline */}
              <div className="flex flex-col items-center mx-8">
                {howItWorksStages.map((stage, idx) => (
                  <React.Fragment key={idx}>
                    <button
                      className={`w-8 h-8 rounded-full border-4 ${idx === currentStage ? "border-cyan-400 bg-cyan-300" : "border-cyan-700 bg-cyan-900"} mb-2 transition-all duration-300`}
                      onClick={() => handleUserInteraction(idx)}
                      aria-label={`Go to ${stage.title}`}
                    />
                    {idx < howItWorksStages.length - 1 && (
                      <div className={`w-1 h-10 ${idx < currentStage ? "bg-cyan-400" : "bg-cyan-700"} transition-all duration-300`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              {/* Right: Image */}
              <div className="flex-1 pl-8">
                <img
                  src={howItWorksStages[currentStage].imageUrl}
                  alt={howItWorksStages[currentStage].title}
                  className="rounded-2xl shadow-2xl w-full max-w-md h-72 object-cover transition-all duration-500"
                  key={howItWorksStages[currentStage].imageUrl}
                />
              </div>
            </div>
          </section>

          {/* Demo Video Section */}
          <section className="w-full flex flex-col items-center mt-20">
            <h2 className="text-3xl font-bold text-cyan-300 font-mono mb-8">See It In Action</h2>
            <video
              ref={videoRef}
              controls
              className="w-full max-w-3xl rounded-xl border border-cyan-400/20 shadow-lg bg-black min-h-[320px]"
              poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>

          {/* Terminal Code Snippet/Mockup */}
          <section ref={codeRef} className="w-full max-w-2xl mx-auto bg-black border border-cyan-400/10 rounded-lg p-10 text-cyan-200 text-xl shadow-inner mt-20 font-mono">
            <div className="mb-4 text-cyan-400">~/simucode $</div>
            <pre>
{`> Listening to question...
> Clarifying edge cases...
> Explaining approach...
> Coding solution...
> Getting feedback...`}
            </pre>
          </section>
        </TerminalBox>
      </main>
      <footer className="w-full bg-gradient-to-r from-black/90 via-gray-900/80 to-black/90 border-t border-cyan-400/20 py-8 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center text-cyan-400 font-mono text-2xl font-bold mb-2 select-none">
            <span className="mr-2">&#60;/&#62;</span>
            <span className="hover:text-cyan-300 transition cursor-pointer">SimuCode</span>
          </div>
          <div className="text-cyan-800 text-base text-center">
            &copy; {new Date().getFullYear()} SimuCode. Not affiliated with LeetCode.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;