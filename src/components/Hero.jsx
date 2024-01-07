import BackgroundSlider from "./BackgroundSlider";
import Timers from "./Timers";

const Hero = () => {
  return (
    <div className="hero">
      <Timers />
      <BackgroundSlider />
      <div className="hero-container">
        <div className="deck-container"></div>
      </div>
    </div>
  );
};
export default Hero;
