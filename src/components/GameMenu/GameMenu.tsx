import { shallowEqual } from "react-redux";
import { useAppSelector } from "@/utils";
import {
  GameMenuTextContent,
  GameMenuCloseBtn,
  StartNewGameBtn,
} from "@/components";

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
