import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { cardFlip } from "../features /deck/deckSlice";
import { useEffect, useState } from "react";
const SingleCard = ({ deckImg, cardsSrc, cardIndex, index, forwardedRef }) => {
  const { cardSrc: src } = cardsSrc[cardIndex] ?? {};
  const { foundCards, flippedCards, lastFlippedCard, onClickEnabled } =
    useSelector((state) => {
      return {
        gridIntValue: state.deck.gridIntValue,
        flippedCards: state.deck.flippedCards,
        lastFlippedCard: state.deck.lastFlippedCard,
        onClickEnabled: state.deck.onClickEnabled,
        foundCards: state.deck.foundCards,
      };
    }, shallowEqual);
  const { moveToDefaultPosition, destCoord, visible } = useSelector((state) => {
    return {
      moveToDefaultPosition: state.transfers.moveToDefaultPosition,
      destCoord: state.transfers.currentPosition[index]?.destCoord,
      visible: state.transfers.visible,
    };
  }, shallowEqual);

  const { "hide-found-cards": hideFoundCards } = useSelector((state) => {
    return {
      "hide-found-cards": state.settings.settings.other["hide-found-cards"],
    };
  }, shallowEqual);
  const [isFlipped, setIsFlipped] = useState(flippedCards?.includes(index));
  const [isHidden, setIsHidden] = useState(foundCards?.includes(index));
  const dispatch = useDispatch();
  useEffect(() => {
    if (index === flippedCards[flippedCards.length - 1] && !isFlipped) {
      setIsFlipped(true);
    } else if (!flippedCards.includes(index)) {
      setIsFlipped(false);
    }
  }, [flippedCards]);
  useEffect(() => {
    const handleHideCards = (value) => {
      if (isHidden === value) return;
      setIsHidden(value);
    };
    if (
      (index === foundCards[foundCards.length - 1] ||
        index === foundCards[foundCards.length - 2]) &&
      !isHidden &&
      hideFoundCards
    ) {
      handleHideCards(true);
    } else if (!hideFoundCards) {
      handleHideCards(false);
    }
  }, [foundCards, hideFoundCards]);
  return (
    <div
      className="single-card-wrapper center-items"
      onDragStart={(e) => e.preventDefault()}
      ref={(el) => (forwardedRef.current[index] = el)}
    >
      <div
        className={`single-card-container  ${
          visible ? "single-card-transition" : ""
        }`}
        style={{
          transform: `${destCoord || moveToDefaultPosition}`,
        }}
      >
        <div className={`single-card ${isFlipped ? "single-card-flip" : ""} `}>
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
          <div
            className={`single-card-front center-items ${
              isHidden ? "single-card-vanishing" : ""
            }`}
          >
            <img src={src} alt="card" className="img card-img" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleCard;
