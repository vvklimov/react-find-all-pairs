import { setShowGameMenu, startNewGame } from "@/features";
import { useAppDispatch } from "@/utils";

const StartNewGameBtn = () => {
  const dispatch = useAppDispatch();
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
