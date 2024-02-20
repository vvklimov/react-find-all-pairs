import { useDispatch, useSelector } from "react-redux";
import { cardFlip } from "../../features/deck/deckSlice";
import { memo } from "react";
import CardImage from "./CardImage";
const SingleCardBack = ({ index, cardIndex, deckImg }) => {
  const dispatch = useDispatch();
  const onClickEnabled = useSelector((state) => state.deck.onClickEnabled);
  const handleCardFlip = () => {
    if (onClickEnabled) {
      dispatch(cardFlip({ index, cardIndex }));
    }
  };
  return (
    <div className="single-card-back center-items" onClick={handleCardFlip}>
      <CardImage src={deckImg} />
    </div>
  );
};
export default memo(SingleCardBack);
