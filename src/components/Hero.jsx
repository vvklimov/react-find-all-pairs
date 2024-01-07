import BackgroundSlider from "./BackgroundSlider";
import DeckContainer from "./DeckContainer";
import Timers from "./Timers";

const Hero = () => {
  return (
    <div className="hero">
      <Timers />
      <BackgroundSlider />
      <div className="hero-container">
        <DeckContainer />
      </div>
    </div>
  );
};
export default Hero;
