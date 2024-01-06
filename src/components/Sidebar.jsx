import { useGameStateContext } from "../context/gameState_context";
import { useSettingsContext } from "../context/settings_context";
import { useSidebarContext } from "../context/sidebar_context";
import { navTags } from "../utils/data";
import { SidebarTag } from "./";
import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { setGameState } = useGameStateContext();
  const { setShowSidebar, showSidebar } = useSidebarContext();
  const { settingsAreEqual, setSettings } = useSettingsContext();
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
            setSettings();
          }}
        >
          {settingsAreEqual ? "new game" : "apply changes and start new game"}
        </button>
        <div className="sidebar-tags">
          <ul className="sidebar-tags-ul">
            {navTags.map((item) => {
              return <SidebarTag key={item.tag} {...item} />;
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
