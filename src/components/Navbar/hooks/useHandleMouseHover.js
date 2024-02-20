import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeout } from "../../../utils/helpers";
import { GAME, PAUSE, RESUME } from "../../../gameStateNames";
import { setGameState } from "../../../features/gameState/gameStateSlice";

const useHandleMouseHover = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [gradient, setGradient] = useState(false);
  const gameState = useSelector((state) => state.gameState.gameState);
  const handleMouseEnter = () => {
    setShowDropdown(true);
    setGradient(true);
    if (gameState === GAME) {
      dispatch(setGameState(PAUSE));
    }
  };
  const handleMouseLeave = async (e) => {
    setShowDropdown(false);
    setGradient(false);
    if (
      gameState === PAUSE &&
      !e?.relatedTarget?.classList?.contains("nav-btn")
    ) {
      await timeout(300);
      dispatch(setGameState(RESUME));
    }
  };
  return { handleMouseEnter, handleMouseLeave, showDropdown, gradient };
};
export default useHandleMouseHover;
