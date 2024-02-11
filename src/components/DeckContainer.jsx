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
import { useQuery } from "@tanstack/react-query";
import { RandomImageQuery } from "../API/randomImage";
const DeckContainer = () => {
  const heroRef = useRef();
  // const deckContainerRef = useRef();
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
  useQuery(RandomImageQuery(shuffledArray, currentTheme));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log(newDeck);
  //   };
  //   if (currentTheme === "surprise-me") {
  //     fetchData();
  //     const newDeck = useQuery(RandomImageQuery());
  //   }
  // }, [shuffledArray]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShuffledArray({ arrayLength, currentSize, currentTheme }));
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
    const delayedResize = debounce(handleResize, 100);
    handleResize();
    window.addEventListener("resize", delayedResize);
    return () => {
      window.removeEventListener("resize", delayedResize);
    };
    // window.addEventListener("resize", handleResize);
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, [currentSize]);
  useEffect(() => {
    const firstAppearance = async () => {
      if (isLoaded) {
        dispatch(updateCurrentPosition("moveToLeft"));
        await timeout(100);
        dispatch(snakeLikeArrival("firstLoad"));
      }
    };
    firstAppearance();
  }, [isLoaded]);
  // if (currentTheme === "surprise-me" && shuffledArray) {
  //   const newDeck = useQuery(RandomImageQuery(shuffledArray));
  //   console.log(newDeck.data);
  // }
  // console.log(decks["surprise-me"]);
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
      {/* <div
        style={{
          position: "absolute",
          fontSize: "3rem",
          zIndex: 100,
          color: "red",
        }}
        className="center-items"
      >
        <h3>{deckContainerRef?.current?.clientWidth}</h3>
        <h3>{deckContainerRef?.current?.clientHeight}</h3>
      </div> */}
      <div
        className={`deck-container ${gridClassName ? gridClassName : ""}`}
        style={{ aspectRatio: `${deckAR[currentSize]}` }}
        // ref={deckContainerRef}
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
