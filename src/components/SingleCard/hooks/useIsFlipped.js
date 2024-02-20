import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
const useIsFlipped = (index) => {
  const { flippedCards } = useSelector((state) => {
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
