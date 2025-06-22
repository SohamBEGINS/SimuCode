import CardSwap, { Card } from "../styles/CardSwap";

const wallpapers = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
];

const stages = [
  {
    title: "Stage 1: Voice-Based Comprehension",
    description: "Type the heard question accurately to proceed.",
  },
  {
    title: "Stage 2: Clarification Q&A",
    description: "Ask edge-case questions and get instant answers.",
  },
  {
    title: "Stage 3: Approach Explanation",
    description: "Explain your algorithmic plan clearly.",
  },
  {
    title: "Stage 4: Code Implementation",
    description: "Write and test your full solution.",
  },
  {
    title: "Summary & Feedback",
    description: "Get detailed performance analytics and tips.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative w-full flex flex-col md:flex-row items-center justify-between bg-[#181526] rounded-2xl mt-16 mb-20 px-4 md:px-16 py-16 shadow-lg overflow-hidden">
      {/* Left: Text */}
      <div className="flex-1 min-w-[320px] md:pr-12 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          How It Works
        </h2>
        <ul className="text-gray-300 text-lg md:text-xl mt-6 space-y-4 list-disc list-inside md:pl-2">
          {stages.map((stage, i) => (
            <li key={i}>
              <span className="font-semibold text-cyan-300">{stage.title}:</span>{" "}
              <span className="text-gray-300">{stage.description}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Right: Card Stack Animation */}
      <div className="flex-1 flex items-center justify-center relative mt-12 md:mt-0">
        <div
          className="relative w-[370px] h-[330px] hidden md:block"
          style={{ transform: "rotateY(-22deg) rotateX(7deg) scale(1.04)" }}
        >
          <CardSwap
            width={340}
            height={240}
            cardDistance={60}
            verticalDistance={40}
            delay={3500}
            pauseOnHover={true}
            skewAmount={14}
            easing="power1.inOut"
          >
            {stages.map((stage, i) => (
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
                <div className="bg-white/80 rounded-b-2xl px-6 py-5 text-left shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-cyan-800 mb-1">{stage.title}</h3>
                  <p className="text-gray-700 text-base">{stage.description}</p>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;