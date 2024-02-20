import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../features/settings/settingsSlice";

const SettingsBtn = ({ tag, subtagClass }) => {
  const tempSettings = useSelector((state) => state.settings.tempSettings);
  const dispatch = useDispatch();
  const checked =
    tempSettings[tag] === subtagClass || tempSettings[tag][subtagClass];
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
