import { useCallback } from "react";
import { useSelector } from "react-redux";
import { bgDest } from "../../utils/data";
import SlideImage from "./SlideImage";

const BackgroundSlide = ({ theme, distance, src }) => {
  const currentTheme = useSelector((state) => state.settings.settings.themes);
  const destination = bgDest[currentTheme];
  if (theme === "dark-fantasy") {
    const chosenBg = useCallback(Math.floor(Math.random() * src.length), []);
    src = src[chosenBg];
  }
  return (
    <div
      onDragStart={(e) => e.preventDefault()}
      className="slide"
      style={{
        left: `${distance}%`,
        transform: `translateX(-${destination * 100}%)`,
      }}
    >
      <SlideImage src={src} theme={theme} />
    </div>
  );
};
export default BackgroundSlide;
