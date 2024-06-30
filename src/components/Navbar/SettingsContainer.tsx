import { SingleSetting } from "@/components";
import { type NavTag } from "@/utils";
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
