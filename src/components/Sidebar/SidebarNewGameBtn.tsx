import { useAppSelector } from "@/utils";
import { useShowGameMenu } from "@/components";

const SidebarNewGameBtn = () => {
  const settingsAreEqual = useAppSelector(
    (state) => state.settings.settingsAreEqual
  );
  const { showGameMenu } = useShowGameMenu();
  return (
    <button className="btn new-game-btn" onClick={showGameMenu}>
      {settingsAreEqual ? "new game" : "apply changes and start new game"}
    </button>
  );
};
export default SidebarNewGameBtn;
