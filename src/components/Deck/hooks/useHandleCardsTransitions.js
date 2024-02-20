import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCardsAspectRatio,
  setCardsTransitions,
} from "../../../features/transfers/transfersSlice";
import { getContainerData } from "../../../utils/helpers";
const useHandleCardsTransitions = (cardsRef, currentSize, heroCenter) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (cardsRef.current?.length !== 0) {
      try {
        const handleCardsTransitions = () => {
          const cardsDataArray = cardsRef.current
            .filter((item) => item)
            .map((wrapperRef, index) =>
              getContainerData(wrapperRef, index, currentSize)
            );
          dispatch(setCardsTransitions(cardsDataArray));
          dispatch(setCardsAspectRatio(cardsDataArray));
        };
        handleCardsTransitions();
      } catch (error) {}
    }
  }, [cardsRef.current.length, currentSize, heroCenter]);
};
export default useHandleCardsTransitions;
