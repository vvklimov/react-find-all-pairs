import { useEffect, useRef } from "react";
import { deckAR, decks } from "../utils/data";
import SingleCard from "./SingleCard";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { getShuffledArray, setupGrid } from "../features /deck/deckSlice";
import { debounce } from "../utils/helpers";
const DeckContainer = () => {
  const wrapperRef = useRef([]);
  const dispatch = useDispatch();
  const { currentSize, arrayLength } = useSelector((state) => state.settings);
  const { shuffledArray, gridClassName } = useSelector((state) => state.deck);

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
              wrapperRef={wrapperRef}
              key={nanoid()}
              {...decks["dark-fantasy"]}
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
