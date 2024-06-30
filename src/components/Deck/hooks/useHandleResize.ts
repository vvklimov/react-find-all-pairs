import { useEffect } from "react";
import { debounce, getContainerData, useAppDispatch } from "@/utils";
import { setOddEvenRow, setupGrid, setHeroCenter } from "@/features";

const useHandleResize = (
  currentSize: number,
  heroRef: React.MutableRefObject<HTMLDivElement | null>,
  shuffledArray: number[]
) => {
  const dispatch = useAppDispatch();
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
