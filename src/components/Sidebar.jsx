import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { navTags } from "../utils/data";
import { SidebarTag } from "./";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { setShowSidebar } from "../features /sidebar/sidebarSlice";
import { setShowGameMenu } from "../features /gameMenu/gameMenuSlice";
import { timeout } from "../utils/helpers";
import { setGameState } from "../features /gameState/gameStateSlice";
import { PAUSE, RESUME } from "../gameStateNames";

const Sidebar = () => {
  const { showSidebar } = useSelector((state) => state.sidebar);
  const { settingsAreEqual } = useSelector((state) => state.settings);
  const { gameState } = useSelector((state) => {
    return {
      gameState: state.gameState.gameState,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const handleCloseSidebar = async () => {
    dispatch(setShowSidebar(false));
    if (gameState === PAUSE) {
      await timeout(500);
      dispatch(setGameState(RESUME));
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 925 && showSidebar) {
        handleCloseSidebar();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showSidebar]);
  return (
    <div className={`sidebar-wrapper ${showSidebar ? "show" : ""}`}>
      <aside className="sidebar">
        <button className="close-btn btn" onClick={handleCloseSidebar}>
          <FaTimes />
        </button>
        <button
          className="btn new-game-btn"
          onClick={() => {
            dispatch(setShowGameMenu(true));
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
