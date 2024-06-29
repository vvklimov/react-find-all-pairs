import { useEffect } from "react";
import {
  setCardsAspectRatio,
  setCardsTransitions,
} from "../../../features/transfers/transfersSlice";
import { getContainerData } from "../../../utils/helpers";
import { HeroCenter } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks";

const useHandleCardsTransitions = (
  cardsRef: React.MutableRefObject<HTMLDivElement[]>,
  currentSize: number,
  heroCenter: HeroCenter
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cardsRef.current?.length !== 0) {
      try {
        const handleCardsTransitions = () => {
          const cardsDataArray = cardsRef.current
            .filter((item) => item)
            .map((wrapperRef, index) => getContainerData(wrapperRef, index));
          dispatch(setCardsTransitions(cardsDataArray));
          dispatch(setCardsAspectRatio(cardsDataArray));
        };
        handleCardsTransitions();
      } catch (error) {
        console.log(`error in useHandleCardsTransitions: ${error}`);
      }
    }
  }, [cardsRef.current.length, currentSize, heroCenter]);
};
export default useHandleCardsTransitions;
