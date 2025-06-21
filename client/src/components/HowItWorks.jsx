import CardSwap , {Card} from "../styles/CardSwap";

const HowItWorks = () => {
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

  return (
    <section className="relative bg-white/80 rounded-3xl shadow-2xl py-20 px-6 text-center mt-24 max-w-4xl mx-auto border border-white/30 backdrop-blur-lg">
      <h2 className="text-4xl font-extrabold mb-10 text-cyan-900 drop-shadow">How It Works</h2>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
            {stages.map((stage, i) => (
              <Card key={i} className="space-y-4 bg-gradient-to-br from-cyan-100 via-white to-cyan-50 border-cyan-200/60 shadow-lg rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-cyan-800 mb-2">{stage.title}</h3>
                <p className="text-gray-700 text-lg">{stage.description}</p>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;