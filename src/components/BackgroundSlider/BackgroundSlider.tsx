import { memo } from "react";
import { backgrounds } from "../../utils/data";
import BackgroundSlide from "./BackgroundSlide";

const BackgroundSlider = () => {
  return (
    <div className="hero-slider">
      <div className="slider-container">
        {backgrounds.map((bg, index) => {
          const distance = index * 100;
          return <BackgroundSlide key={index} distance={distance} bg={bg} />;
        })}
      </div>
    </div>
  );
};
export default memo(BackgroundSlider);
