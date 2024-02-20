import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { PAUSE, RESUME } from "../../gameStateNames";
import { setGameState } from "../../features/gameState/gameStateSlice";
import { timeout } from "../../utils/helpers";
import { setShowGameMenu } from "../../features/gameMenu/gameMenuSlice";
const CloseBtn = () => {
  const dispatch = useDispatch();
  const { gameState, showSidebar } = useSelector((state) => {
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
