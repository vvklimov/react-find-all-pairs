import { useEffect, useRef } from "react";
import { decks } from "../utils/data";
import SingleCard from "./SingleCard";
import { useDeckContext } from "../context/deck_context";
import { nanoid } from "nanoid";

const DeckContainer = () => {
  const { shuffledArray, deckContainerRef, gridClassName, deckMaxWidth } =
    useDeckContext();
  const wrapperRef = useRef([]);
  return (
    <div className="hero-container">
      <div
        className={`deck-container ${gridClassName ? gridClassName : ""}`}
        ref={deckContainerRef}
        style={{ maxWidth: deckMaxWidth }}
      >
        {
          // make dynamic
          shuffledArray.map((cardIndex, index) => {
            return (
              <SingleCard
                wrapperRef={wrapperRef}
                key={nanoid()}
                {...decks["dark-fantasy"]}
                cardIndex={cardIndex}
                index={index}
              />
            );
          })
        }
      </div>
    </div>
  );
};
export default DeckContainer;
