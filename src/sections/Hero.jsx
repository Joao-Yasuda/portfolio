import HeroText from "../components/HeroText";
import Spline from "@splinetool/react-spline";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none lg:pointer-events-auto">
        <Spline scene="https://draft.spline.design/KhCSwwEyEWzsuNmS/scene.splinecode" />
      </div>

      <div className="relative z-10 h-full pointer-events-none">
        <div className="hidden md:flex items-start justify-start h-full c-space">
          <HeroText />
        </div>

        <div className="flex md:hidden items-center justify-center h-full px-4">
          <HeroText />
        </div>
      </div>
    </section>
  );
};

export default Hero;
