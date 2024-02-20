import { useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RandomImageQuery } from "../../API/randomImage";
import { RandomPersonQuery } from "../../API/randomPerson";
import DeckContainer from "./DeckContainer";
import useHandleResize from "./hooks/useHandleResize";
const HeroContainer = () => {
  const heroRef = useRef();
  const { currentSize, currentTheme, shuffledArray } = useSelector((state) => {
    return {
      currentSize: state.settings.currentSize,
      currentTheme: state.settings.settings.themes,
      shuffledArray: state.deck.shuffledArray,
    };
  }, shallowEqual);

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
