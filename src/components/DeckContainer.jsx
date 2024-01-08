import { useEffect } from "react";
import { decks } from "../utils/data";
import SingleCard from "./SingleCard";
import { useDeckContext } from "../context/deck_context";
import { nanoid } from "nanoid";

const DeckContainer = () => {
  const { shuffledArray } = useDeckContext();
  return (
    <div className="hero-container">
      <div className="deck-container grid-4columns">
        {decks.map((deck) => {
          // make dynamic
          if (deck.deckName === "dark-fantasy") {
            console.log(shuffledArray);
            return shuffledArray.map((index) => {
              return <SingleCard key={nanoid()} {...deck} index={index} />;
            });
          }
        })}
      </div>
    </div>
  );
};
export default DeckContainer;
