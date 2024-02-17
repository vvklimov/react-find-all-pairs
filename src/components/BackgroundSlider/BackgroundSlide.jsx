import { useCallback } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { bgDest } from "../../utils/data";
import SlideImage from "./SlideImage";

const BackgroundSlide = ({ theme, distance, src }) => {
  const { currentTheme } = useSelector((state) => {
    return {
      currentTheme: state.settings.settings.themes,
    };
  }, shallowEqual);
  const destination = bgDest[currentTheme];
  if (theme === "dark-fantasy") {
    const index = useCallback(Math.floor(Math.random() * src.length), []);
    src = src[index];
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
