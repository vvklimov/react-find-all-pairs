import { useEffect, useRef } from "react";
import { deckAR, decks } from "../utils/data";
import SingleCard from "./SingleCard";
import { nanoid } from "nanoid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getShuffledArray,
  setOddEvenRow,
  setupGrid,
} from "../features /deck/deckSlice";
import { debounce, timeout } from "../utils/helpers";
import {
  setHeroCenter,
  snakeLikeArrival,
  updateCurrentPosition,
} from "../features /transfers/transfersSlice";
const DeckContainer = () => {
  const heroRef = useRef();
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
  const { isLoaded } = useSelector((state) => {
    return { isLoaded: state.transfers.isLoaded };
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
    const handleHeroCenter = (heroRef) => {
      const {
        left: heroLeft,
        right: heroRight,
        bottom: heroBottom,
        top: heroTop,
      } = heroRef?.current?.getBoundingClientRect();
      const heroCenterY = (heroBottom - heroTop) / 2 + heroTop;
      const heroCenterX = (heroRight - heroLeft) / 2 + heroLeft;
      dispatch(
        setHeroCenter({
          heroCenterY,
          heroCenterX,
          heroBottom,
          heroLeft,
          heroRight,
          heroTop,
        })
      );
    };
    const handleResize = () => {
      dispatch(setupGrid({ currentSize }));
      dispatch(setOddEvenRow());
      handleHeroCenter(heroRef);
    };
    const delayedResize = debounce(handleResize, 500);
    handleResize();
    window.addEventListener("resize", delayedResize);
    return () => {
      window.removeEventListener("resize", delayedResize);
    };
  }, [currentSize]);
  useEffect(() => {
    const firstAppearance = async () => {
      if (isLoaded) {
        dispatch(updateCurrentPosition("moveToLeft"));
        await timeout(100);
        dispatch(snakeLikeArrival());
      }
    };
    firstAppearance();
  }, [isLoaded]);
  return (
    <div className="hero-container" ref={heroRef}>
      {/* <div
        style={{
          position: "absolute",
          width: "3px",
          height: "3px",
          top: "50%",
          left: "50%",
          zIndex: 10,
          background: "red",
        }}
      ></div> */}
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
              currentSize={currentSize}
            />
          );
        })}
      </div>
    </div>
  );
};
export default DeckContainer;
