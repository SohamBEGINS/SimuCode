import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import BeamBackground from "../components/BeamBackground";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BeamBackground />
      <main className="flex-1 flex flex-col">
        <Hero />
        <HowItWorks />
      </main>
    </div>
  );
};

export default Home;
// This is the main Home component for the application.
// It imports and renders the Hero and HowItWorks components.
// how the export name Home is used ?