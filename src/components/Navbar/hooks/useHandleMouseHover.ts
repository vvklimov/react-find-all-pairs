import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { timeout } from "../../../utils/helpers";
import { GAME, PAUSE, RESUME } from "../../../gameStateNames";
import { setGameState } from "../../../features/gameState/gameStateSlice";

const useHandleMouseHover = () => {
  const dispatch = useAppDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [gradient, setGradient] = useState(false);
  const gameState = useAppSelector((state) => state.gameState.gameState);

  const handleMouseEnter = () => {
    setShowDropdown(true);
    setGradient(true);
    if (gameState === GAME) {
      dispatch(setGameState(PAUSE));
    }
  };
  const handleMouseLeave = async (e: React.MouseEvent<HTMLElement>) => {
    setShowDropdown(false);
    setGradient(false);
    if (
      gameState === PAUSE &&
      !(e.relatedTarget as Element).classList?.contains("nav-btn")
    ) {
      await timeout(300);
      dispatch(setGameState(RESUME));
    }
  };
  return { handleMouseEnter, handleMouseLeave, showDropdown, gradient };
};
export default useHandleMouseHover;
