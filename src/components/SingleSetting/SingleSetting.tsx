import type { Subtag, Tag } from "@/utils";
import { SettingsBtn } from "@/components";

type SingleSettingProps = {
  subtag: Subtag;
  tag: Tag;
};
const SingleSetting = ({ subtag, tag }: SingleSettingProps) => {
  const { subtagName, subtagClass } = subtag;
  return (
    <div className="single-setting center-items">
      <SettingsBtn subtagClass={subtagClass} tag={tag} />
      <span>{subtagName}</span>
    </div>
  );
};
export default SingleSetting;
