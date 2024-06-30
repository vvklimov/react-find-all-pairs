import { useCallback } from "react";
import { useAppDispatch } from "@/utils";
import { PAUSE } from "@/gameStateNames";
import { setShowGameMenu, setGameState } from "@/features";

const useShowGameMenu = () => {
  const dispatch = useAppDispatch();
  const showGameMenu = useCallback(() => {
    dispatch(setShowGameMenu(true));
    dispatch(setGameState(PAUSE));
  }, []);
  return { showGameMenu };
};
export default useShowGameMenu;
