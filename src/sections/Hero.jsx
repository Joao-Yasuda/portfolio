import HeroText from "../components/HeroText";
import Spline from "@splinetool/react-spline";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <Spline scene="https://draft.spline.design/KhCSwwEyEWzsuNmS/scene.splinecode" />
      </div>

      <div className="relative z-10 flex items-start justify-center md:items-start md:justify-start h-full c-space pointer-events-none">
        <HeroText />
      </div>
    </section>
  );
};

export default Hero;
