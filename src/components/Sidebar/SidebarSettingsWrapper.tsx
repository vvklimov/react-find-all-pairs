import { navTags } from "@/utils";
import { SidebarSettingsContainer } from "@/components";

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
