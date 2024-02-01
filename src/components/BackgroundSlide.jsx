import { useCallback } from "react";

const BackgroundSlide = ({ theme, distance, src, destination }) => {
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
      <img className="slide-img" src={src} alt={`${theme} img`} />
    </div>
  );
};
export default BackgroundSlide;
