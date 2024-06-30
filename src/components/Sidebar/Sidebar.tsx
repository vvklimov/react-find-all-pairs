import {
  SidebarCloseBtn,
  SidebarNewGameBtn,
  SidebarSettingsWrapper,
  useHandleCloseSidebar,
} from "@/components";

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
