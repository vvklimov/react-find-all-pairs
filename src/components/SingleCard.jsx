import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { cardFlip } from "../features /deck/deckSlice";
import { useEffect, useRef, useState } from "react";
import { setCardsTransitions } from "../features /transfers/transfersSlice";
import { debounce } from "../utils/helpers";
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
  const { moveToDefaultPosition, currentPosition } = useSelector((state) => {
    return {
      moveToDefaultPosition: state.transfers.moveToDefaultPosition,
      currentPosition: state.transfers.currentPosition,
    };
  }, shallowEqual);
  const { destCoord } = currentPosition[index] ?? {};

  const [isFlipped, setIsFlipped] = useState(flippedCards?.includes(index));
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  console.log("render");
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
  useEffect(() => {
    const handleCardTransitions = (wrapperRef) => {
      const {
        top: cardTop,
        left: cardLeft,
        right: cardRight,
        bottom: cardBottom,
      } = wrapperRef?.current?.getBoundingClientRect();
      const cardCenterY = (cardBottom - cardTop) / 2 + cardTop;
      const cardCenterX = (cardRight - cardLeft) / 2 + cardLeft;
      dispatch(
        setCardsTransitions({
          index,
          cardCenterX,
          cardCenterY,
          cardBottom,
          cardLeft,
          cardRight,
          cardTop,
        })
      );
    };
    const handleResize = debounce(() => {
      handleCardTransitions(wrapperRef);
    }, 500);
    handleCardTransitions(wrapperRef);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [wrapperRef]);
  return (
    <div
      className="single-card-wrapper center-items"
      onDragStart={(e) => e.preventDefault()}
      ref={wrapperRef}
      // style={{

      // }}
    >
      <div
        className={`single-card-container ${setOddEvenRow()}`}
        style={{
          transform: `${destCoord || moveToDefaultPosition}`,
          // display: "block",
        }}
      >
        {/* remove helping div below later */}
        {/* <div
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
        </div> */}
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
