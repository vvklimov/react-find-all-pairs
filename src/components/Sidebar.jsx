import { useGameStateContext } from "../context/gameState_context";
import { useSidebarContext } from "../context/sidebar_context";
import { navTags } from "../utils/data";
import SidebarTag from "./SidebarTag";
import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { setGameState } = useGameStateContext();
  const { setShowSidebar, showSidebar } = useSidebarContext();
  return (
    <div className={`sidebar-wrapper ${showSidebar ? "show" : ""}`}>
      <aside className="sidebar">
        <button
          className="close-btn btn"
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          <FaTimes />
        </button>
        <button
          className="btn new-game-btn"
          onClick={() => {
            setGameState("GAME");
          }}
        >
          new game
        </button>
        <div className="sidebar-tags">
          <ul className="sidebar-tags-ul">
            {navTags.map((item) => {
              // console.log(item);
              return <SidebarTag key={item.tag} {...item} />;
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
