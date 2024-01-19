import { useSelector } from "react-redux";

const SingleCard = ({
  deckName,
  deckImg,
  cardsSrc,
  cardIndex,
  index,
  wrapperRef,
}) => {
  const { cardSrc: src } = cardsSrc[cardIndex];
  const { gridIntValue, cardWidth, cardHeight } = useSelector(
    (state) => state.deck
  );

  const setOddEvenRow = () => {
    if (Math.ceil((index + 1) / gridIntValue) % 2 !== 0) {
      return "odd-row";
    } else {
      return "even-row";
    }
  };
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
          // className={`single-card ${
          //   flippedCards.includes(index) ? "single-card-flip" : ""
          // }`}
          className="single-card"
          data-pair-id={cardIndex}
          data-found="false"
        >
          <div
            className="single-card-back"
            // onClick={() => cardFlip(event, index)}
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
