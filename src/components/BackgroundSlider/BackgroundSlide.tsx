import { useMemo } from "react";
import { bgDest, useAppSelector } from "@/utils";
import { SlideImage } from "@/components";

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

  const destination: number = bgDest[currentTheme as keyof typeof bgDest];

  if (theme === "dark-fantasy" && src.length) {
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
