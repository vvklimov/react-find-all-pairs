import { memo } from "react";
import SingleCardBack from "./SingleCardBack";
import SingleCardFront from "./SingleCardFront";
import useIsFlipped from "./hooks/useIsFlipped";
import type { SingleCardProps } from "../../utils/types";

const SingleCard = ({
  index,
  cardIndex,
  deckImg,
  cardsSrc,
}: SingleCardProps) => {
  const { cardSrc: src } = cardsSrc[cardIndex] ?? {};
  const { isFlipped } = useIsFlipped(index);
  return (
    <div className={`single-card ${isFlipped ? "single-card-flip" : ""} `}>
      <SingleCardBack index={index} cardIndex={cardIndex} deckImg={deckImg} />
      <SingleCardFront src={src} index={index} />
    </div>
  );
};

export default memo(SingleCard);
