import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { cardFlip } from "../../features/deck/deckSlice";
import { memo } from "react";
import CardImage from "./CardImage";
import { SingleCardBackProps } from "../../utils/types";
const SingleCardBack = ({ index, cardIndex, deckImg }: SingleCardBackProps) => {
  const dispatch = useAppDispatch();
  const onClickEnabled = useAppSelector((state) => state.deck.onClickEnabled);
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
