import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import BeamBackground from "../components/BeamBackground";
import ScrollReveal from "../styles/ScrollReveal";

const revealLines = [
  "FELT LIKE GETTING STUCK IN A REAL INTERVIEW?",
  "GOT REJECTED BECAUSE OF THE PRESSURE?",
  "WANT TO KNOW SIMULATE REAL CODING INTERVIEW?",
  "WE GOT YOU COVERED. LOOK NO FURTHER THAN",
];

const Home = () => (
  <div className="relative min-h-screen flex flex-col">
    <BeamBackground />
    <main className="flex-1 flex flex-col">
      <Hero />
      <div className="h-20 md:h-32" />
      <div className="relative z-10">
        <ScrollReveal
          lines={revealLines}
          className="max-w-3xl mx-auto text-center font-mono text-white text-3xl md:text-5xl font-bold py-12 md:py-20 mb-24 md:mb-32"
          lineClassName="mb-8 md:mb-12 leading-snug"
        />
      </div>
      
      
    </main>
  </div>
);

export default Home;

// This is the main Home component for the application.
// It imports and renders the Hero and HowItWorks components.
// how the export name Home is used ?