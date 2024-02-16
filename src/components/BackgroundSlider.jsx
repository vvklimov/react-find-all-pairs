import { useEffect, useState, useMemo } from "react";
import { backgrounds, bgDest } from "../utils/data";
import BackgroundSlide from "./BackgroundSlide";
import { shallowEqual, useSelector } from "react-redux";

const BackgroundSlider = () => {
  const { currentTheme } = useSelector((state) => {
    return {
      currentTheme: state.settings.themes,
    };
  }, shallowEqual);
  const [destination, setDestination] = useState(bgDest[currentTheme]);
  useEffect(() => {
    setDestination(bgDest[currentTheme]);
  }, [currentTheme]);

  return useMemo(() => {
    return (
      <div className="hero-slider">
        <div className="slider-container">
          {backgrounds.map((bg, index) => {
            let { theme, src } = bg;
            let distance = index * 100;

            return (
              <BackgroundSlide
                key={index}
                distance={distance}
                theme={theme}
                src={src}
                destination={destination}
              />
            );
          })}
        </div>
      </div>
    );
  }, [destination]);
};
export default BackgroundSlider;
