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
      <div className="relative z-10">
        <div className="flex justify-center mb-8">
  <div className="h-2 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-200 to-cyan-400 opacity-70"></div>
</div>
        <ScrollReveal
  lines={revealLines}
  className="
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
  lineClassName="
    mb-0
    leading-relaxed
    transition-all
    duration-700
  "
/>



      </div>
      
      
    </main>
  </div>
);

export default Home;