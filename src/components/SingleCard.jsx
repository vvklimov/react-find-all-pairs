import { useDeckContext } from "../context/deck_context";
import { createRef, useEffect } from "react";

const SingleCard = ({ deckName, deckImg, cardsSrc, index }) => {
  const { cardSrc: src } = cardsSrc[index];
  const {
    singleCardWrapperRef,
    singleCardRef,
    cardWidth,
    cardHeight,
    setWidthToCards,
  } = useDeckContext();

  const addToSingleCardRef = (el) => {
    singleCardRef.current = [];
    if (el && !singleCardRef.current.includes(el)) {
      singleCardRef.current.push(el);
    }
  };
  const addToSingleCardWrapperRef = (el) => {
    singleCardWrapperRef.current = [];
    if (el && !singleCardWrapperRef.current.includes(el)) {
      singleCardWrapperRef.current.push(el);
    }
  };
  // console.log(cardWidth);
  // console.log(cardHeight);
  // useEffect(() => {
  //   // setWidthToCards();
  // }, [singleCardRef, singleCardWrapperRef]);
  // console.log(cardsSrc);
  return (
    <div className="single-card-wrapper" ref={addToSingleCardWrapperRef}>
      <div
        className="single-card-container"
        ref={addToSingleCardRef}
        // REMOVE STYLE LATER
        style={{ width: cardWidth, height: cardHeight }}
      >
        <div className="single-card" data-card-id="{index}" data-found="false">
          <div className="single-card-back">
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
