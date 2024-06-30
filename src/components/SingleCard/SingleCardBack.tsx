import { memo } from "react";
import {
  useAppDispatch,
  useAppSelector,
  type SingleCardBackProps,
} from "@/utils";
import { cardFlip } from "@/features";
import { CardImage } from "@/components";

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
