import { navTags } from "../../utils/data";
import SidebarSettingsContainer from "./SidebarSettingsContainer";
const SidebarSettingsWrapper = () => {
  return (
    <section className="sidebar-settings-wrapper">
      <div className="sidebar-all-settings-container">
        {navTags.map((navTag) => {
          return <SidebarSettingsContainer key={navTag.tag} {...navTag} />;
        })}
      </div>
    </section>
  );
};
export default SidebarSettingsWrapper;
