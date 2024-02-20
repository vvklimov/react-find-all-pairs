import { useSelector } from "react-redux";
import useShowGameMenu from "../Navbar/hooks/useShowGameMenu";
const SidebarNewGameBtn = () => {
  const settingsAreEqual = useSelector(
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
