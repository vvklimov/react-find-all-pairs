import SidebarCloseBtn from "./SidebarCloseBtn";
import SidebarNewGameBtn from "./SidebarNewGameBtn";
import SidebarSettingsWrapper from "./SidebarSettingsWrapper";
import useHandleCloseSidebar from "./hooks/useHandleCloseSidebar";
const Sidebar = () => {
  const { handleCloseSidebar, showSidebar } = useHandleCloseSidebar();

  return (
    <div className={`sidebar-wrapper ${showSidebar ? "show" : ""}`}>
      <aside className="sidebar">
        <SidebarCloseBtn handleCloseSidebar={handleCloseSidebar} />
        <SidebarNewGameBtn />
        <SidebarSettingsWrapper />
      </aside>
    </div>
  );
};
export default Sidebar;
