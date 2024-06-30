import { useRef } from "react";
import { shallowEqual } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/utils";
import { RandomImageQuery, RandomPersonQuery } from "@/API";
import { DeckContainer, useHandleResize } from "@/components";

const HeroContainer = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { currentSize, currentTheme, shuffledArray } = useAppSelector(
    (state) => {
      return {
        currentSize: state.settings.currentSize,
        currentTheme: state.settings.settings.themes,
        shuffledArray: state.deck.shuffledArray,
      };
    },
    shallowEqual
  );

  useQuery(RandomImageQuery(shuffledArray, currentTheme));
  useQuery(RandomPersonQuery(shuffledArray, currentTheme));

  useHandleResize(currentSize, heroRef, shuffledArray);

  return (
    <div className="hero-container" ref={heroRef}>
      <DeckContainer
        currentSize={currentSize}
        currentTheme={currentTheme}
        shuffledArray={shuffledArray}
      />
    </div>
  );
};

export default HeroContainer;
