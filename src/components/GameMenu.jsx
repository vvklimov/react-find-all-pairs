import { FaTimes } from "react-icons/fa";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setShowGameMenu } from "../features /gameMenu/gameMenuSlice";
import GameMenuTextContent from "./GameMenuTextContent";
import { startNewGame } from "../features /deck/deckSlice";
import { PAUSE, RESUME } from "../gameStateNames";
import { setGameState } from "../features /gameState/gameStateSlice";
import { timeout } from "../utils/helpers";

const GameMenu = () => {
  const { show, textContent } = useSelector((state) => {
    return {
      show: state.gameMenu.show,
      textContent: state.gameMenu.textContent,
    };
  }, shallowEqual);
  const { gameState } = useSelector((state) => {
    return {
      gameState: state.gameState.gameState,
    };
  }, shallowEqual);
  const { showSidebar } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  return (
    <div className={`sidebar-wrapper game-menu ${show ? "show" : ""}`}>
      <aside className="sidebar">
        <button
          className="close-btn btn"
          onClick={async () => {
            dispatch(setShowGameMenu(false));
            if (gameState === PAUSE && !showSidebar) {
              await timeout(500);
              dispatch(setGameState(RESUME));
            }
          }}
        >
          <FaTimes />
        </button>
        <div className="text-content center-items">
          <GameMenuTextContent textContent={textContent} />
        </div>
        <div className="btn-container">
          <button
            onClick={() => {
              dispatch(startNewGame());
            }}
            className="btn start-new-game-btn"
          >
            start new game
          </button>
        </div>
      </aside>
    </div>
  );
};
export default GameMenu;
