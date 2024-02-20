import BackgroundSlider from "../BackgroundSlider/BackgroundSlider";
import HeroContainer from "../Deck/HeroContainer";
import Timers from "../Timers/Timers";

const Hero = () => {
  return (
    <div className="hero">
      <Timers />
      <BackgroundSlider />
      <HeroContainer />
    </div>
  );
};
export default Hero;
