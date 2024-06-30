import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../../utils/hooks";
const useIsFlipped = (index: number) => {
  const { flippedCards } = useAppSelector((state) => {
    return {
      flippedCards: state.deck.flippedCards,
    };
  }, shallowEqual);
  const [isFlipped, setIsFlipped] = useState(flippedCards?.includes(index));
  useEffect(() => {
    if (index === flippedCards[flippedCards.length - 1] && !isFlipped) {
      setIsFlipped(true);
    } else if (!flippedCards.includes(index)) {
      setIsFlipped(false);
    }
  }, [flippedCards]);
  return { isFlipped };
};
export default useIsFlipped;
