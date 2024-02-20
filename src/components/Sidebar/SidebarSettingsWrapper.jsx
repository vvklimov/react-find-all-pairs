import { navTags } from "../../utils/data";
import SidebarSettingsContainer from "./SidebarSettingsContainer";
const SidebarSettingsWrapper = () => {
  return (
    <section className="sidebar-settings-wrapper">
      <div className="sidebar-all-settings-container">
        {navTags.map((item) => {
          return <SidebarSettingsContainer key={item.tag} {...item} />;
        })}
      </div>
    </section>
  );
};
export default SidebarSettingsWrapper;
