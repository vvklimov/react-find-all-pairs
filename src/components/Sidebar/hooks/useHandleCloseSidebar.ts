import { shallowEqual } from "react-redux";
import { useEffect } from "react";
import { setShowSidebar } from "../../../features/sidebar/sidebarSlice";
import { timeout } from "../../../utils/helpers";
import { setGameState } from "../../../features/gameState/gameStateSlice";
import { PAUSE, RESUME } from "../../../gameStateNames";
import { useAppSelector, useAppDispatch } from "../../../utils/hooks";
const useHandleCloseSidebar = () => {
  const { showSidebar, gameState } = useAppSelector((state) => {
    return {
      showSidebar: state.sidebar.showSidebar,
      gameState: state.gameState.gameState,
    };
  }, shallowEqual);
  const dispatch = useAppDispatch();
  const handleCloseSidebar = async () => {
    dispatch(setShowSidebar(false));
    if (gameState === PAUSE) {
      await timeout(500);
      dispatch(setGameState(RESUME));
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 925 && showSidebar) {
        handleCloseSidebar();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showSidebar]);
  return { handleCloseSidebar, showSidebar };
};
export default useHandleCloseSidebar;
