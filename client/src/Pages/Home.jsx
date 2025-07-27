import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import stage0Img from '@/assets/howitworks/stage0.png'
import stage1Img from '../assets/howitworks/stage1.png';
import stage2Img from '../assets/howitworks/stage2.png';
import stage3Img from '../assets/howitworks/stage3.png';
import stage4Img from '../assets/howitworks/stage4.png';
import summaryImg from '../assets/howitworks/summary.png';
import { Button } from "../components/ui/button";
import demoVideo from '../assets/videos/demo_video.mp4';


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
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [terminalInView, setTerminalInView] = useState(false);

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
            onEnter: () => setTerminalInView(true),
            once: true,
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
            <h2 className="text-3xl font-bold text-cyan-300 font-mono mb-4">See It In Action</h2>
            <p className="text-lg text-cyan-100 font-mono mb-4 max-w-xl text-center">Watch a real coding interview simulation. Experience the pressure, the process, and the feedback!</p>
            <div className="relative w-full max-w-3xl rounded-xl min-h-[320px] flex items-center justify-center group">
              <video
                ref={videoRef}
                controls
                className="relative w-full max-w-2xl aspect-video object-cover rounded-xl border-2 border-cyan-400/40 shadow-lg bg-black z-10"
                poster="/logo.png"
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
              >
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!videoPlaying && (
                <button
                  className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 hover:bg-black/10 transition rounded-xl"
                  style={{ pointerEvents: 'auto' }}
                  onClick={() => videoRef.current && videoRef.current.play()}
                  aria-label="Play video"
                >
                  <svg className="w-20 h-20 text-cyan-200 drop-shadow-lg" fill="currentColor" viewBox="0 0 84 84"><circle cx="42" cy="42" r="42" fill="currentColor" opacity="0.2"/><polygon points="34,26 62,42 34,58" fill="currentColor" /></svg>
                </button>
              )}
            </div>
            <div className="mt-4">
              <Button size="lg" variant="default" onClick={() => window.location.href='/dashboard'}>
                Try a Live Interview
              </Button>
            </div>
          </section>

          {/* Terminal Code Snippet/Mockup */}
          <section ref={codeRef} className="w-full max-w-2xl mx-auto bg-black border border-cyan-400/10 rounded-lg p-10 text-cyan-200 text-xl shadow-inner mt-20 font-mono flex flex-col items-center">
            <div className="mb-4 text-cyan-400">~/simucode $</div>
            <AnimatedTerminalText activate={terminalInView} />
            <div className="mt-8">
              <Button size="lg" variant="outline" onClick={() => window.location.href='/dashboard'}>
                Try Demo
              </Button>
            </div>
          </section>
        </TerminalBox>
      </main>
      <footer className="w-full bg-gradient-to-r from-black/90 via-gray-900/80 to-black/90 border-t border-cyan-400/20 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
                                                                {/* Project Info */}
              <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start mb-3">
                   <img 
                     src="/logo.png" 
                     alt="SimuCode Logo" 
                     className="h-32 w-auto hover:scale-105 transition-transform cursor-pointer"
                   />
                 </div>
                  <h3 className="text-3xl font-bold text-cyan-300 font-mono">SimuCode</h3>
               </div>

            {/* Support Section */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-cyan-300 mb-4 font-mono">
                Support the Project
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => window.open('https://github.com/SohamBEGINS/SimuCode', '_blank')}
                  className="group flex items-center justify-center gap-2 w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-all duration-300 border border-cyan-500/30 hover:border-cyan-400"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-mono">⭐ Star on GitHub</span>
                </button>
                
                <button
                  onClick={() => window.open('mailto:gangulysoham67@gmail.com?subject=Bug Report - SimuCode', '_blank')}
                  className="group flex items-center justify-center gap-2 w-full bg-red-900/30 hover:bg-red-800/40 text-red-300 px-4 py-3 rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-400"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="font-mono">🐛 Report Bug</span>
                </button>
              </div>
            </div>

                         {/* Connect Section */}
             <div className="text-center md:text-right">
               <h4 className="text-lg font-semibold text-cyan-300 mb-4 font-mono">
                 Connect
               </h4>
               <div className="flex justify-center md:justify-end gap-3">
                 <button
                   onClick={() => window.open('https://www.linkedin.com/in/soiamcoding', '_blank')}
                   className="group p-3 bg-blue-600/30 hover:bg-blue-500/40 text-blue-300 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-400"
                   title="Connect on LinkedIn"
                 >
                   <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                   </svg>
                 </button>
               </div>
             </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-cyan-500/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Made with</span>
                <svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>for the coding community</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-mono"
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-mono"
                >
                  Terms of Service
                </a>
                <span className="text-gray-600 font-mono">
                  &copy; {new Date().getFullYear()} SimuCode. Not affiliated with LeetCode.
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

const terminalLines = [
  '> Listening to question...',
  '> Clarifying edge cases...',
  '> Explaining approach...',
  '> Coding solution...',
  '> Getting feedback...'
];

function AnimatedTerminalText({ activate }) {
  const [displayed, setDisplayed] = React.useState('');
  const [lineIdx, setLineIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!activate) return;
    if (lineIdx < terminalLines.length) {
      if (charIdx < terminalLines[lineIdx].length) {
        const timeout = setTimeout(() => {
          setDisplayed(prev => prev + terminalLines[lineIdx][charIdx]);
          setCharIdx(charIdx + 1);
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayed(prev => prev + '\n');
          setLineIdx(lineIdx + 1);
          setCharIdx(0);
        }, 400);
        return () => clearTimeout(timeout);
      }
    } else {
      setDone(true);
    }
  }, [lineIdx, charIdx, activate]);

  return (
    <pre ref={containerRef} className="w-full text-cyan-200 text-lg md:text-xl font-mono bg-black rounded-lg p-4 min-h-[160px] text-left whitespace-pre-wrap select-text">
      {displayed}
      <span className="animate-pulse">|</span>
    </pre>
  );
}