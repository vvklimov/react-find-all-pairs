import BackgroundSlider from "./BackgroundSlider";

const Hero = () => {
  return (
    <div className="hero">
      <div className="timer-container"></div>
      <BackgroundSlider />
      <div className="hero-container">
        <div className="deck-container"></div>
      </div>
    </div>
  );
};
export default Hero;
