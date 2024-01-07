const SingleCard = ({ deckName, deckImg, cardsSrc }) => {
  const src = cardsSrc[0].cardsSrc;
  return (
    <div className="single-card-wrapper">
      <div
        className="single-card-container"
        // REMOVE STYLE LATER
        style={{ width: "100px", height: "150px" }}
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
