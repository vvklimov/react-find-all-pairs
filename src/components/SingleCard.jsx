import { useSelector, useDispatch } from "react-redux";
import { cardFlip } from "../features /deck/deckSlice";
import { useEffect, useState } from "react";
const SingleCard = ({
  deckName,
  deckImg,
  cardsSrc,
  cardIndex,
  index,
  wrapperRef,
}) => {
  const { cardSrc: src } = cardsSrc[cardIndex];
  const { gridIntValue, flippedCards } = useSelector((state) => state.deck);
  const [isFlipped, setIsFlipped] = useState(flippedCards.includes(index));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isFlipped);
    const manageFlippedState = () => {
      // if (
      //   flippedCards?.includes(index) &&
      //   flippedCards[flippedCards.length - 1] === index
      // ) {
      //   setIsFlipped((prev) => {
      //     return !prev;
      //   });
      //   // console.log(isFlipped);
      //   console.log();
      // }
      // let flipped = isFlipped;
      // console.log(flipped);
    };
    manageFlippedState();
  }, [isFlipped]);
  const setOddEvenRow = () => {
    if (Math.ceil((index + 1) / gridIntValue) % 2 !== 0) {
      return "odd-row";
    } else {
      return "even-row";
    }
  };
  // console.log(flippedCards);
  return (
    <div
      className="single-card-wrapper center-items"
      ref={(el) => (wrapperRef.current[index] = el)}
    >
      <div className={`single-card-container ${setOddEvenRow()}`}>
        <div
          className={`single-card ${isFlipped ? "single-card-flip" : ""}`}
          // className="single-card"
          data-pair-id={cardIndex}
          data-found="false"
        >
          <div
            className="single-card-back center-items"
            onClick={(e) => {
              setIsFlipped(true);
              // dispatch(cardFlip({ e, index, cardIndex }));
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
