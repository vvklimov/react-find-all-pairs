import { useDeckContext } from "../context/deck_context";
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
  const {
    cardWidth,
    cardHeight,
    setWrapperDimensions,
    wrapperDimensions,
    gridIntValue,
    cardFlip,
    flippedCards,
  } = useDeckContext();

  const [wrapperWidthHeight, setWrapperWidthHeight] =
    useState(wrapperDimensions);
  const setOddEvenRow = () => {
    if (Math.ceil((index + 1) / gridIntValue) % 2 !== 0) {
      return "odd-row";
    } else {
      return "even-row";
    }
  };

  useEffect(() => {
    if (
      wrapperWidthHeight.width !== wrapperRef?.current[0].clientWidth ||
      wrapperWidthHeight.height !== wrapperRef?.current[0].clientHeight
    )
      setWrapperWidthHeight({
        width: wrapperRef?.current[0].clientWidth,
        height: wrapperRef?.current[0].clientHeight,
      });
  }, [wrapperRef.current]);
  useEffect(() => {
    setWrapperDimensions(wrapperWidthHeight);
  }, [wrapperWidthHeight.width, wrapperWidthHeight.height]);
  return (
    <div
      className="single-card-wrapper"
      ref={(el) => (wrapperRef.current[index] = el)}
    >
      <div
        className={`single-card-container ${setOddEvenRow()}`}
        style={{ width: cardWidth, height: cardHeight }}
      >
        <div
          className={`single-card ${
            flippedCards.includes(index) ? "single-card-flip" : ""
          }`}
          data-pair-id={cardIndex}
          data-found="false"
        >
          <div
            className="single-card-back"
            onClick={() => cardFlip(event, index)}
          >
            <img src={deckImg} alt="card" className="img card-img" />
          </div>
          <div className="single-card-front">
            <img src={src} alt="card" className="img card-img" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleCard;
