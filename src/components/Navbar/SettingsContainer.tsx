import SingleSetting from "../SingleSetting/SingleSetting";
import type { NavTag } from "../../utils/types";
const SettingsContainer = ({ subtags, tag }: NavTag) => {
  return (
    <div className="settings-container">
      {subtags.map((subtag, index) => {
        return <SingleSetting subtag={subtag} key={index} tag={tag} />;
      })}
    </div>
  );
};

export default SettingsContainer;
