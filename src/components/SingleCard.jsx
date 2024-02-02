import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { cardFlip } from "../features /deck/deckSlice";
import { useEffect, useState } from "react";
const SingleCard = ({ deckName, deckImg, cardsSrc, cardIndex, index }) => {
  const { cardSrc: src } = cardsSrc[cardIndex];
  const { gridIntValue, flippedCards, lastFlippedCard, onClickEnabled } =
    useSelector((state) => {
      return {
        gridIntValue: state.deck.gridIntValue,
        flippedCards: state.deck.flippedCards,
        lastFlippedCard: state.deck.lastFlippedCard,
        onClickEnabled: state.deck.onClickEnabled,
      };
    }, shallowEqual);

  const [isFlipped, setIsFlipped] = useState(flippedCards?.includes(index));
  const dispatch = useDispatch();
  useEffect(() => {
    if (index === flippedCards[flippedCards.length - 1] && !isFlipped) {
      setIsFlipped(true);
    } else if (!flippedCards.includes(index)) {
      setIsFlipped(false);
    }
  }, [flippedCards]);
  const setOddEvenRow = () => {
    if (Math.ceil((index + 1) / gridIntValue) % 2 !== 0) {
      return "odd-row";
    } else {
      return "even-row";
    }
  };
  return (
    <div
      className="single-card-wrapper center-items"
      onDragStart={(e) => e.preventDefault()}
    >
      <div className={`single-card-container ${setOddEvenRow()}`}>
        {/* remove helping div below later */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            color: "red",
            zIndex: 1,
            fontSize: "40px",
            height: "0",
          }}
        >
          {cardIndex}
        </div>
        <div className={`single-card ${isFlipped ? "single-card-flip" : ""}`}>
          <div
            className="single-card-back center-items"
            onClick={() => {
              if (onClickEnabled) {
                dispatch(cardFlip({ index, cardIndex, lastFlippedCard }));
              }
            }}
          >
            <img src={deckImg} alt="card" className="img card-img" />
          </div>
          <div className="single-card-front center-items">
            <img src={src} alt="card" className="img card-img" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleCard;
