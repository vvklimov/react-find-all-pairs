import { Tag, Subtag } from "../../utils/types";
import SingleSetting from "../SingleSetting/SingleSetting";
type SidebarSettingsContainerProps = { tag: Tag; subtags: Subtag[] };
const SidebarSettingsContainer = ({
  tag,
  subtags,
}: SidebarSettingsContainerProps) => {
  return (
    <div className="settings-container">
      <h4 className="tag-btn tag-btn-gradient gradient-hover-effect">{tag}</h4>
      {subtags.map((subtag, index) => {
        return <SingleSetting subtag={subtag} key={index} tag={tag} />;
      })}
    </div>
  );
};
export default SidebarSettingsContainer;
