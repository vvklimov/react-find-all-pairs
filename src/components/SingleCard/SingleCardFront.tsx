import { memo, useState, useEffect } from "react";
import { shallowEqual } from "react-redux";
import { CardImage } from "@/components";
import { useAppSelector } from "@/utils";

type SingleCardFrontProps = { src: string; index: number };

const SingleCardFront = ({ src, index }: SingleCardFrontProps) => {
  const { isHidden } = useHideCards(index);
  return (
    <div
      className={`single-card-front center-items ${
        isHidden ? "single-card-vanishing" : ""
      }`}
    >
      <CardImage src={src} />
    </div>
  );
};

export default memo(SingleCardFront);

const useHideCards = (index: number) => {
  const { foundCards, hideFoundCards } = useAppSelector((state) => {
    return {
      foundCards: state.deck.foundCards,
      hideFoundCards: state.settings.settings.other["hide-found-cards"],
    };
  }, shallowEqual);
  const [isHidden, setIsHidden] = useState(foundCards?.includes(index));
  useEffect(() => {
    const handleHideCards = (value: boolean) => {
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
  return { isHidden };
};
