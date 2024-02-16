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
  setCardsTransitions,
  setHeroCenter,
  snakeLikeArrival,
  updateCurrentPosition,
} from "../features /transfers/transfersSlice";
import { useQuery } from "@tanstack/react-query";
import { RandomImageQuery } from "../API/randomImage";
import { RandomPersonQuery } from "../API/randomPerson";
const DeckContainer = () => {
  const heroRef = useRef();
  const cardsRef = useRef([]);
  const {
    currentSize,
    arrayLength,
    themes: currentTheme,
  } = useSelector((state) => {
    return {
      currentSize: state.settings.currentSize,
      arrayLength: state.settings.arrayLength,
      themes: state.settings.settings.themes,
    };
  }, shallowEqual);
  const { isLoaded, heroCenter } = useSelector((state) => {
    return {
      isLoaded: state.transfers.isLoaded,
      heroCenter: state.transfers.heroCenter,
    };
  }, shallowEqual);
  const { shuffledArray, gridClassName } = useSelector((state) => {
    return {
      shuffledArray: state.deck.shuffledArray,
      gridClassName: state.deck.gridClassName,
    };
  }, shallowEqual);
  useQuery(RandomImageQuery(shuffledArray, currentTheme));
  useQuery(RandomPersonQuery(shuffledArray, currentTheme));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShuffledArray({ arrayLength, currentSize, currentTheme }));
    const handleResize = () => {
      dispatch(setupGrid({ currentSize }));
      dispatch(setOddEvenRow());
      dispatch(setHeroCenter(getContainerData(heroRef.current)));
    };
    handleResize();
    const delayedResize = debounce(handleResize, 100);
    window.addEventListener("resize", delayedResize);
    return () => {
      window.removeEventListener("resize", delayedResize);
    };
  }, [currentSize]);
  useEffect(() => {
    if (cardsRef.current?.length !== 0) {
      try {
        cardsRef.current = cardsRef.current.filter((item) => item);
        const handleCardsTransitions = () => {
          const cardsDataArray = cardsRef.current.map((wrapperRef, index) =>
            getContainerData(wrapperRef, index, currentSize)
          );
          dispatch(setCardsTransitions(cardsDataArray));
        };
        handleCardsTransitions();
      } catch (error) {}
    }
  }, [cardsRef.current.length, currentSize, heroCenter]);
  useEffect(() => {
    if (isLoaded) {
      const firstAppearance = async () => {
        dispatch(updateCurrentPosition("moveToLeft"));
        await timeout(100);
        dispatch(snakeLikeArrival("firstLoad"));
      };
      firstAppearance();
    }
  }, [isLoaded]);

  return (
    <div className="hero-container" ref={heroRef}>
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
              forwardedRef={cardsRef}
            />
          );
        })}
      </div>
    </div>
  );
};

const getContainerData = (ref, index) => {
  const { top, left, right, bottom } = ref?.getBoundingClientRect();
  const centerY = (bottom - top) / 2 + top;
  const centerX = (right - left) / 2 + left;
  return {
    index,
    centerX,
    centerY,
    top,
    left,
    right,
    bottom,
  };
};
export default DeckContainer;
