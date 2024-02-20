import { useRef, memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { deckAR, decks } from "../../utils/data";
import { nanoid } from "nanoid";
import SingleCardWrapper from "../SingleCard/SingleCardWrapper";
import useHandleCardsTransitions from "./hooks/useHandleCardsTransitions";
const DeckContainer = ({ currentSize, currentTheme, shuffledArray }) => {
  const cardsRef = useRef([]);
  const { heroCenter, gridClassName } = useSelector((state) => {
    return {
      heroCenter: state.transfers.heroCenter,
      gridClassName: state.deck.gridClassName,
    };
  }, shallowEqual);

  useHandleCardsTransitions(cardsRef, currentSize, heroCenter);
  return (
    <div
      className={`deck-container ${gridClassName ? gridClassName : ""}`}
      style={{ aspectRatio: `${deckAR[currentSize]}` }}
    >
      {shuffledArray.map((cardIndex, index) => {
        return (
          <SingleCardWrapper
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
  );
};

export default memo(DeckContainer);
