import { useEffect } from "react";
import { decks } from "../utils/data";
import SingleCard from "./SingleCard";
import { useDeckContext } from "../context/deck_context";
import { nanoid } from "nanoid";

const DeckContainer = () => {
  const { shuffledArray, deckContainerRef, gridClassName, deckMaxWidth } =
    useDeckContext();
  return (
    <div className="hero-container">
      <div
        className={`deck-container ${gridClassName ? gridClassName : ""}`}
        ref={deckContainerRef}
        style={{ maxWidth: deckMaxWidth }}
      >
        {
          // make dynamic
          shuffledArray.map((index) => {
            return (
              <SingleCard
                key={nanoid()}
                {...decks["dark-fantasy"]}
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
