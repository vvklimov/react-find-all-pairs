import { useRef } from "react";
import { shallowEqual } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RandomImageQuery } from "../../API/randomImage";
import { RandomPersonQuery } from "../../API/randomPerson";
import DeckContainer from "./DeckContainer";
import useHandleResize from "./hooks/useHandleResize";
import { useAppSelector } from "../../utils/hooks";

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
