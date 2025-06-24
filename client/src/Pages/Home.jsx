import Hero from "../components/Hero";
import BeamBackground from "../components/BeamBackground";
import ScrollReveal from "../styles/ScrollReveal";
import CardSwap, { Card } from "../styles/CardSwap";
import { useRef, useState } from "react";

const revealText =
  "FELT LIKE GETTING STUCK IN A REAL INTERVIEW? " +
  "GOT REJECTED BECAUSE OF THE PRESSURE? " +
  "WANT TO KNOW SIMULATE REAL CODING INTERVIEW? " +
  "WE GOT YOU COVERED. LOOK NO FURTHER THAN";

const wallpapers = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
];

const cardStages = [
  {
    title: "Voice-Based Comprehension",
    description: "Type the heard question accurately to proceed.",
  },
  {
    title: "Clarification Q&A",
    description: "Ask edge-case questions and get instant answers.",
  },
  {
    title: "Approach Explanation",
    description: "Explain your algorithmic plan clearly.",
  },
  {
    title: "Code Implementation",
    description: "Write and test your full solution.",
  },
  {
    title: "Summary & Feedback",
    description: "Get detailed performance analytics and tips.",
  },
];

const HowItWorksSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const swapRef = useRef(0);

  const handleCardSwap = (idx) => {
    setActiveIdx(idx);
    swapRef.current = idx;
  };

  return (
    <section className="relative max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between bg-black/80 rounded-3xl mt-12 mb-20 px-4 md:px-20 py-16 shadow-2xl border border-cyan-400/20 backdrop-blur-lg overflow-visible min-h-[340px]">
      {/* Left: Large Stage Text */}
      <div className="flex-1 flex flex-col items-center md:items-start justify-center px-2 md:pl-10 z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
          How It Works
        </h2>
        <div className="w-full max-w-xl">
          <div className="transition-all duration-500">
            <div className="text-cyan-300 text-3xl md:text-4xl font-bold mb-4">
              {cardStages[activeIdx].title}
            </div>
            <div className="text-gray-100 text-xl md:text-2xl font-medium">
              {cardStages[activeIdx].description}
            </div>
          </div>
        </div>
      </div>
      {/* Card Stack Animation at bottom right of container */}
      <div className="flex-1 flex items-end justify-end relative w-full h-full min-h-[260px]">
        <div
          className="absolute bottom-0 right-0 w-[360px] h-[240px] hidden md:block"
          style={{ transform: "rotateY(-18deg) rotateX(6deg) scale(1.06)" }}
        >
          <CardSwap
            width={340}
            height={220}
            cardDistance={60}
            verticalDistance={36}
            delay={3200}
            pauseOnHover={true}
            skewAmount={12}
            easing="power1.inOut"
            onSwap={handleCardSwap}
          >
            {cardStages.map((stage, i) => (
              <Card
                key={i}
                className="overflow-hidden flex flex-col justify-end shadow-2xl border-0"
                style={{
                  background: `linear-gradient(120deg, rgba(0,0,0,0.45), rgba(0,0,0,0.15)), url(${wallpapers[i % wallpapers.length]}) center/cover no-repeat`,
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
                  borderRadius: "1.5rem",
                  border: "none",
                }}
              >
                {/* Card content is intentionally minimal, text is on the right */}
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

const Home = () => (
  <div className="relative min-h-screen flex flex-col">
    
    <main className="flex-1 flex flex-col">
      <Hero />
      <div className="relative z-10">
        <div className="flex justify-center mb-8">
          <div className="h-2 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-400 opacity-70"></div>
        </div>
        <ScrollReveal
          containerClassName="
            w-11/12 max-w-5xl mx-auto
            text-center
            font-mono font-semibold uppercase
            text-white
            text-lg md:text-2xl
            tracking-widest
            drop-shadow-[0_2px_16px_rgba(0,255,255,0.10)]
            py-10 md:py-16
            mb-16 md:mb-28
            rounded-2xl
            shadow
            space-y-10 md:space-y-14
            transition-all
            duration-700
          "
          textClassName="
            mb-0
            leading-relaxed
            transition-all
            duration-700
          "
        >
          {revealText}
        </ScrollReveal>
      </div>
      <HowItWorksSection />
    </main>
  </div>
);

export default Home;