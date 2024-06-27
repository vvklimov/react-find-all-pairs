import { useMemo } from "react";
import { bgDest } from "../../utils/data";
import SlideImage from "./SlideImage";
import { useAppSelector } from "../../utils/hooks";

type bg = {
  src: string | string[];
  theme: string;
};

type BackgroundSlideProps = {
  bg: bg;
  distance: number;
};

const BackgroundSlide = ({ bg, distance }: BackgroundSlideProps) => {
  let { theme, src } = bg;
  const currentTheme: string = useAppSelector(
    (state) => state.settings.settings.themes
  );
  console.log(currentTheme);

  const destination: number = bgDest[currentTheme as keyof typeof bgDest];
  if (theme === "dark-fantasy" && src.length) {
    console.log(src);

    const chosenBg: number = useMemo(
      () => Math.floor(Math.random() * src.length),
      []
    );
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
      <SlideImage src={src as string} theme={theme} />
    </div>
  );
};
export default BackgroundSlide;
