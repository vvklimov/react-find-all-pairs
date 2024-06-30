import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import preloadImages from "image-preload";
import { getShuffledArray } from "../../../features/deck/deckSlice";
import { timeout } from "../../../utils/helpers";
import {
  setIsLoaded,
  snakeLikeArrival,
  updateCurrentPosition,
} from "../../../features/transfers/transfersSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

const useHandleLoading = () => {
  const { showRules, currentSize, currentTheme, arrayLength } = useAppSelector(
    (state) => {
      return {
        showRules: state.settings.settings.other["show-rules"],
        currentSize: state.settings.currentSize,
        arrayLength: state.settings.arrayLength,
        currentTheme: state.settings.settings.themes,
      };
    },
    shallowEqual
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleLoading = () => {
      dispatch(getShuffledArray({ arrayLength, currentSize, currentTheme }));
      const images = document.querySelectorAll("img");
      const imageURLs = Array.from(images).map((img) => img.src);
      preloadImages(imageURLs, {
        onComplete: async () => {
          dispatch(setIsLoaded(true));
          dispatch(updateCurrentPosition("moveToLeft"));
          await timeout(100);
          dispatch(snakeLikeArrival(true));
        },
      });
    };
    if (document.readyState === "complete") {
      handleLoading();
    } else {
      window.addEventListener("load", handleLoading);
    }
    return () => {
      return window.removeEventListener("load", handleLoading);
    };
  }, []);
  return { showRules };
};
export default useHandleLoading;
