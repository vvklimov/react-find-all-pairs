import { useShowGameMenu } from "@/components";

const ShowGameMenuBtn = () => {
  const { showGameMenu } = useShowGameMenu();
  return (
    <button
      className="btn new-game-btn navbar-new-game-btn"
      onClick={showGameMenu}
    >
      new game
    </button>
  );
};
export default ShowGameMenuBtn;
