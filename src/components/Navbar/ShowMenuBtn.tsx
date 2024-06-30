import { useCallback } from "react";
import { useAppDispatch } from "@/utils";
import { setShowSidebar, setGameState } from "@/features";
import { PAUSE } from "@/gameStateNames";

const ShowMenuBtn = () => {
  const dispatch = useAppDispatch();
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
