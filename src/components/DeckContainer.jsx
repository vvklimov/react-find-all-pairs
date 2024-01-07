import { decks } from "../utils/data";
import SingleCard from "./SingleCard";

const DeckContainer = () => {
  return (
    <div className="deck-container" style={{ overflowX: "visible" }}>
      {decks.map((deck, index) => {
        if (deck.deckName === "dark-fantasy") {
          return <SingleCard key={index} {...deck} />;
        }
      })}
    </div>
  );
};
export default DeckContainer;
