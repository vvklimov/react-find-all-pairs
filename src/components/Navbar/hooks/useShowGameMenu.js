import { useDispatch } from "react-redux";
import { setShowGameMenu } from "../../../features/gameMenu/gameMenuSlice";
import { setGameState } from "../../../features/gameState/gameStateSlice";
import { PAUSE } from "../../../gameStateNames";
import { useCallback } from "react";
const useShowGameMenu = () => {
  const dispatch = useDispatch();
  const showGameMenu = useCallback(() => {
    dispatch(setShowGameMenu(true));
    dispatch(setGameState(PAUSE));
  }, []);
  return { showGameMenu };
};
export default useShowGameMenu;
