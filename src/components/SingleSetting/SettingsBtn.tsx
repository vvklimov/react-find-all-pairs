import { updateSettings } from "../../features/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import type { SettingsOtherClass, SubtagClass, Tag } from "../../utils/types";

type SettingsBtnProps = { tag: Tag; subtagClass: SubtagClass };
const SettingsBtn = ({ tag, subtagClass }: SettingsBtnProps) => {
  const tempSettings = useAppSelector((state) => state.settings.tempSettings);
  const dispatch = useAppDispatch();

  const checked =
    tempSettings[tag] === subtagClass ||
    tempSettings[tag as "other"][subtagClass as SettingsOtherClass];

  return (
    <button
      className="settings-btn checkbox-btn"
      onClick={() => {
        dispatch(updateSettings({ tag, subtagClass }));
      }}
    >
      <div className="checkbox-btn-middle-part">
        <div
          className={`checkbox-btn-middle-part ${checked ? "checked" : ""}`}
        ></div>
      </div>
    </button>
  );
};
export default SettingsBtn;
