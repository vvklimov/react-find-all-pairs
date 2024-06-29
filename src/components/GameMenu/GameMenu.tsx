import { shallowEqual } from "react-redux";
import GameMenuTextContent from "./GameMenuTextContent";
import GameMenuCloseBtn from "./GameMenuCloseBtn";
import StartNewGameBtn from "./StartNewGameBtn";
import { useAppSelector } from "../../utils/hooks";
const GameMenu = () => {
  const { show, textContent } = useAppSelector((state) => {
    return {
      show: state.gameMenu.show,
      textContent: state.gameMenu.textContent,
    };
  }, shallowEqual);

  return (
    <div className={`sidebar-wrapper game-menu ${show ? "show" : ""}`}>
      <aside className="sidebar">
        <GameMenuCloseBtn />
        <GameMenuTextContent textContent={textContent} />
        <StartNewGameBtn />
      </aside>
    </div>
  );
};
export default GameMenu;
