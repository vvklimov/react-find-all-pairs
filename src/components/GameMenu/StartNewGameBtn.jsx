import { useDispatch } from "react-redux";
import { setShowGameMenu } from "../../features/gameMenu/gameMenuSlice";
import { startNewGame } from "../../features/deck/deckSlice";

const StartNewGameBtn = () => {
  const dispatch = useDispatch();
  const handleStartNewGame = () => {
    dispatch(setShowGameMenu(false));
    dispatch(startNewGame());
  };
  return (
    <div className="btn-container">
      <button onClick={handleStartNewGame} className="btn start-new-game-btn">
        start new game
      </button>
    </div>
  );
};
export default StartNewGameBtn;
