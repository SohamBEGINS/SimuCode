import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import BeamBackground from "../components/BeamBackground";
import Footer from "../components/Footer";
import ScrollReveal from "../styles/ScrollReveal";

const revealText = `FELT LIKE GETTING STUCK IN A REAL INTERVIEW? GOT REJECTED BECAUSE OF THE PRESSURE? 
WANT TO KNOW SIMULATE REAL CODING INTERVIEW? WE GOT YOU COVERED. LOOK NO FURTHER THAN`;

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BeamBackground />
      <main className="flex-1 flex flex-col">
        <Hero />
        <div className="h-12 md:h-24" />
        <ScrollReveal
          text={revealText}
          className="max-w-3xl mx-auto text-center font-mono text-white text-2xl md:text-3xl font-bold"
          wordClassName="px-1"
        />
        <HowItWorks />
        <Footer />
      </main>
    </div>
  );
};


export default Home;
// This is the main Home component for the application.
// It imports and renders the Hero and HowItWorks components.
// how the export name Home is used ?