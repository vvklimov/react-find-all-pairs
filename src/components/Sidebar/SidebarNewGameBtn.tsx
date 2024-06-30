import useShowGameMenu from "../Navbar/hooks/useShowGameMenu";
import { useAppSelector } from "../../utils/hooks";
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
