import { shallowEqual } from "react-redux";
import { timeout, useAppDispatch, useAppSelector } from "@/utils";
import { setGameState, setShowGameMenu } from "@/features";
import { PAUSE, RESUME } from "@/gameStateNames";
import { FaTimes } from "react-icons/fa";

const CloseBtn = () => {
  const dispatch = useAppDispatch();
  const { gameState, showSidebar } = useAppSelector((state) => {
    return {
      gameState: state.gameState.gameState,
      showSidebar: state.sidebar.showSidebar,
    };
  }, shallowEqual);
  const handleCloseGameMenu = async () => {
    dispatch(setShowGameMenu(false));
    if (gameState === PAUSE && !showSidebar) {
      await timeout(500);
      dispatch(setGameState(RESUME));
    }
  };
  return (
    <button className="close-btn btn" onClick={handleCloseGameMenu}>
      <FaTimes />
    </button>
  );
};
export default CloseBtn;
