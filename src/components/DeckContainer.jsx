import { useEffect } from "react";
import { deckAR, decks } from "../utils/data";
import SingleCard from "./SingleCard";
import { nanoid } from "nanoid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getShuffledArray, setupGrid } from "../features /deck/deckSlice";
import { debounce } from "../utils/helpers";
const DeckContainer = () => {
  const {
    currentSize,
    arrayLength,
    settings: { themes: currentTheme },
  } = useSelector((state) => {
    return {
      currentSize: state.settings.currentSize,
      arrayLength: state.settings.arrayLength,
      settings: state.settings.settings,
    };
  }, shallowEqual);
  const { shuffledArray, gridClassName } = useSelector((state) => {
    return {
      shuffledArray: state.deck.shuffledArray,
      gridClassName: state.deck.gridClassName,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShuffledArray({ arrayLength, currentSize }));
    const handleResize = () => {
      dispatch(setupGrid({ currentSize }));
    };
    const delayedResize = debounce(handleResize, 500);
    handleResize();
    window.addEventListener("resize", delayedResize);
    return () => {
      window.removeEventListener("resize", delayedResize);
    };
  }, [currentSize]);

  return (
    <div className="hero-container">
      <div
        className={`deck-container ${gridClassName ? gridClassName : ""}`}
        style={{ aspectRatio: `${deckAR[currentSize]}` }}
      >
        {shuffledArray.map((cardIndex, index) => {
          return (
            <SingleCard
              key={nanoid()}
              {...decks[currentTheme]}
              cardIndex={cardIndex}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};
export default DeckContainer;
