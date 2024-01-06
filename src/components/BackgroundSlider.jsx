import { useEffect, useState, useMemo } from "react";
import { backgrounds, bgDest } from "../utils/data";
import BackgroundSlide from "./BackgroundSlide";
import { useSettingsContext } from "../context/settings_context";

const BackgroundSlider = () => {
  const { settings } = useSettingsContext();
  const [destination, setDestination] = useState(bgDest[settings.themes]);
  useEffect(() => {
    setDestination(bgDest[settings.themes]);
  }, [settings.themes]);

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
