import { useDispatch, useSelector } from "react-redux";
import { navTags } from "../utils/data";
import { SidebarTag } from "./";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { setShowSidebar } from "../features /sidebar/sidebarSlice";

const Sidebar = () => {
  const { showSidebar } = useSelector((state) => state.sidebar);
  const { settingsAreEqual } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 925 && showSidebar) {
        dispatch(setShowSidebar(false));
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
        <button
          className="close-btn btn"
          onClick={() => {
            dispatch(setShowSidebar(false));
          }}
        >
          <FaTimes />
        </button>
        <button
          className="btn new-game-btn"
          onClick={() => {
            // setSettings();
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
