import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import stage0Img from'@/assets/howitworks/stage0.png'
import stage1Img from '../assets/howitworks/stage1.png';
import stage2Img from '../assets/howitworks/stage2.png';
import stage3Img from '../assets/howitworks/stage3.png';
import stage4Img from '../assets/howitworks/stage4.png';
import summaryImg from '../assets/howitworks/summary.png';


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

const howItWorksStages = [
  {
    title: "Stage 0: Select Difficulty",
    description: "Begin by choosing the difficulty level of your coding interview question. This helps tailor the challenge to your skill and preparation goals.",
    imageUrl: stage0Img
  },
  {
    title: "Stage 1: Listen",
    description: "Carefully listen to the coding problem presented by the AI interviewer.Then type it in your own words",
    imageUrl: stage1Img
  },
  {
    title: "Stage 2: Clarify",
    description: "Ask clarifying questions to ensure you understand the requirements.",
    imageUrl: stage2Img
  },
  {
    title: "Stage 3: Approach",
    description: "Describe your approach and discuss possible solutions before coding.",
    imageUrl: stage3Img
  },
  {
    title: "Stage 4: Code",
    description: "Write and submit your code. Get instant feedback and iterate.",
    imageUrl: stage4Img
  },
  {
    title: "Stage 5: Feedback",
    description: "Receive a detailed summary and feedback on your performance.",
    imageUrl: summaryImg
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
  const prevStageRef = useRef(currentStage);

  // Autoplay logic for timeline
  React.useEffect(() => {
    autoplayRef.current = setTimeout(() => {
      setCurrentStage((prev) => (prev + 1) % howItWorksStages.length);
    }, 2000);
    return () => clearTimeout(autoplayRef.current);
  }, [currentStage]);

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
            <p
              className="text-2xl md:text-3xl font-light font-mono italic mb-12 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow text-center max-w-3xl mx-auto"
            >
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
          <section ref={howItWorksRef} className="w-full flex flex-col items-center py-16  rounded-2xl my-12">
            <h2 className="text-4xl font-extrabold text-cyan-200 mb-10">How It Works</h2>
            {/* Horizontal Timeline */}
            <div className="flex flex-row items-center justify-center w-full max-w-3xl mb-8">
              {howItWorksStages.map((stage, idx) => (
                <React.Fragment key={idx}>
                  <button
                    className={`w-8 h-8 rounded-full border-4 flex items-center justify-center text-lg font-bold font-mono transition-all duration-300
                      ${idx === currentStage ? "border-cyan-400 bg-cyan-300 text-black" : "border-cyan-700 bg-cyan-900 text-cyan-400"}`}
                    onClick={() => setCurrentStage(idx)}
                    aria-label={`Go to ${stage.title}`}
                  >
                    {idx}
                  </button>
                  {idx < howItWorksStages.length - 1 && (
                    <div className={`h-1 w-16 md:w-24 bg-gradient-to-r ${idx < currentStage ? "from-cyan-400 to-cyan-300" : "from-cyan-800 to-cyan-900"} mx-1 md:mx-2 rounded-full transition-all duration-300`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            {/* Description */}
            <div className="w-full max-w-2xl mx-auto text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg font-mono">
                {howItWorksStages[currentStage].title}
              </h3>
              <p className="text-xl md:text-2xl font-mono italic font-light bg-gradient-to-r from-cyan-200/80 via-blue-200/60 to-purple-200/80 bg-clip-text text-transparent drop-shadow mb-2">
                {howItWorksStages[currentStage].description}
              </p>
            </div>
            {/* Image */}
            <div className="w-full flex justify-center">
              <div className="relative w-full max-w-4xl min-h-[520px] flex items-center justify-center">
                {howItWorksStages.map((stage, idx) => (
                  <img
                    key={stage.imageUrl}
                    src={stage.imageUrl}
                    alt={stage.title}
                    className={`absolute top-0 left-0 w-full h-full object-contain rounded-2xl shadow-2xl transition-opacity duration-500 ${idx === currentStage ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'}`}
                    style={{ transitionProperty: 'opacity' }}
                  />
                ))}
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