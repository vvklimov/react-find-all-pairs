import { useDispatch } from "react-redux";
import { setShowSidebar } from "../../features/sidebar/sidebarSlice";
import { setGameState } from "../../features/gameState/gameStateSlice";
import { useCallback } from "react";
import { PAUSE } from "../../gameStateNames";
const ShowMenuBtn = () => {
  const dispatch = useDispatch();

  const showMenu = useCallback(() => {
    dispatch(setShowSidebar(true));
    dispatch(setGameState(PAUSE));
  }, []);

  return (
    <button className="btn toggle-btn" onClick={showMenu}>
      menu
    </button>
  );
};
export default ShowMenuBtn;
