import { useRef, memo } from "react";
import { shallowEqual } from "react-redux";
import { nanoid } from "nanoid";
import { deckAR, decks } from "../../utils/data";
import { useAppSelector } from "../../utils/hooks";
import type { SettingsThemeClass } from "../../utils/types";
import SingleCardWrapper from "../SingleCard/SingleCardWrapper";
import useHandleCardsTransitions from "./hooks/useHandleCardsTransitions";

type DeckContainerProps = {
  currentSize: number;
  currentTheme: SettingsThemeClass;
  shuffledArray: number[];
};
const DeckContainer = ({
  currentSize,
  currentTheme,
  shuffledArray,
}: DeckContainerProps) => {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const { heroCenter, gridClassName } = useAppSelector((state) => {
    return {
      heroCenter: state.transfers.heroCenter,
      gridClassName: state.deck.gridClassName,
    };
  }, shallowEqual);

  useHandleCardsTransitions(cardsRef, currentSize, heroCenter);
  return (
    <div
      className={`deck-container ${gridClassName ? gridClassName : ""}`}
      style={{ aspectRatio: `${deckAR[currentSize as keyof typeof deckAR]}` }}
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
