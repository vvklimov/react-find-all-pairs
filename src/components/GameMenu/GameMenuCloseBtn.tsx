import { shallowEqual } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { PAUSE, RESUME } from "../../gameStateNames";
import { setGameState } from "../../features/gameState/gameStateSlice";
import { timeout } from "../../utils/helpers";
import { setShowGameMenu } from "../../features/gameMenu/gameMenuSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
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
