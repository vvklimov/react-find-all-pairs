import { useRef, memo } from "react";
import { shallowEqual } from "react-redux";
import { nanoid } from "nanoid";
import {
  deckAR,
  decks,
  useAppSelector,
  type SettingsThemeClass,
} from "@/utils";
import { SingleCardWrapper, useHandleCardsTransitions } from "@/components";

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
            forwardedRef={cardsRef}
          />
        );
      })}
    </div>
  );
};

export default memo(DeckContainer);
