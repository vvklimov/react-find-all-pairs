import { updateSettings } from "@/features";
import {
  useAppDispatch,
  useAppSelector,
  type SettingsOtherClass,
  type SubtagClass,
  type Tag,
} from "@/utils";

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
