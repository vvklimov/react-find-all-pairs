import { useEffect, useRef } from "react";
import { decks } from "../utils/data";
import SingleCard from "./SingleCard";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import {
  getShuffledArray,
  setupGrid,
  setWidthToCards,
} from "../features /deck/deckSlice";
import { debounce } from "../utils/helpers";
const DeckContainer = () => {
  const deckRef = useRef();
  const wrapperRef = useRef([]);
  const dispatch = useDispatch();
  const { currentSize, arrayLength } = useSelector((state) => state.settings);
  const { shuffledArray, deckMaxWidth, gridClassName } = useSelector(
    (state) => state.deck
  );

  useEffect(() => {
    dispatch(getShuffledArray({ arrayLength, currentSize }));
  }, [currentSize]);

  useEffect(() => {
    const handleResize = () => {
      const deckContainerHeight = deckRef?.current?.clientHeight;
      const wrapperWidth = wrapperRef?.current[0]?.clientWidth;
      const wrapperHeight = wrapperRef?.current[0]?.clientHeight;
      dispatch(setupGrid({ currentSize, deckContainerHeight }));
      if (wrapperWidth && wrapperHeight) {
        // console.log(wrapperWidth, wrapperHeight);
        dispatch(setWidthToCards({ wrapperWidth, wrapperHeight }));
      }
    };

    const delayedResize = debounce(handleResize, 10);

    handleResize();
    delayedResize();
    window.addEventListener("resize", delayedResize);
    return () => {
      window.removeEventListener("resize", delayedResize);
    };
  }, []);

  return (
    <div className="hero-container">
      <div
        className={`deck-container ${gridClassName ? gridClassName : ""}`}
        ref={deckRef}
        style={{ maxWidth: deckMaxWidth }}
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
