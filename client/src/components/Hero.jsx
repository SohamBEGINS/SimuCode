import TypewriterText from "./TypewriterText";
import TiltedCard from "../styles/TiltedCard";
import RotatingText from "../styles/RotatingText";

const Hero = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center py-20 px-6 mb-32 rounded-3xl shadow-2xl">
      <div className="flex flex-col md:flex-row items-center md:items-center w-full gap-16">
        <div className="flex-[3] max-w-3xl text-left">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight drop-shadow-lg">
            Simulate Real Coding 
        <TypewriterText className="text-4xl md:text-6xl" /> 
          </h1>
          <p className="italic text-white-700 mt-8 mb-16 text-2xl md:text-3xl">
            Practice, Learn, and Succeed in Tech Interviews by simulating real-time
            pressure environments.
          </p>
          <button className="mt-4 md:mt-12 bg-gradient-to-r from-green-500 to-cyan-500 text-white px-14 py-6 rounded-2xl text-2xl font-bold shadow-lg hover:from-green-600 hover:to-cyan-600 transition-all duration-200">
            Start Interview
          </button>
        </div>
        <div className="flex-[1] flex justify-center md:justify-end w-full md:w-auto">
          <TiltedCard
            imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
            containerHeight="320px"
            containerWidth="320px"
            imageHeight="320px"
            imageWidth="320px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <p className="tilted-card-demo-text text-center font-semibold text-lg text-white bg-black/60 rounded-lg px-2 py-1">
                Kendrick Lamar - GNX
              </p>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
