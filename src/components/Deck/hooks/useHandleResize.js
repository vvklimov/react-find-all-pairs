import { useDispatch } from "react-redux";
import { debounce, getContainerData } from "../../../utils/helpers";
import { setOddEvenRow, setupGrid } from "../../../features/deck/deckSlice";
import { setHeroCenter } from "../../../features/transfers/transfersSlice";
import { useEffect } from "react";
const useHandleResize = (currentSize, heroRef, shuffledArray) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setupGrid({ currentSize }));
      dispatch(setOddEvenRow());
      dispatch(setHeroCenter(getContainerData(heroRef.current)));
    };
    handleResize();
    const delayedResize = debounce(handleResize, 100);
    window.addEventListener("resize", delayedResize);
    return () => {
      window.removeEventListener("resize", delayedResize);
    };
  }, [shuffledArray]);
};
export default useHandleResize;
