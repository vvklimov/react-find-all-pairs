import { useGameStateContext } from "../context/gameState_context";
import { useSettingsContext } from "../context/settings_context";

const SettingsBtn = ({ tag, subtagClass }) => {
  const { tempSettings, updateSettings } = useSettingsContext();
  const { gameState } = useGameStateContext();
  let checked =
    tempSettings[tag] === subtagClass || tempSettings[tag][subtagClass];
  return (
    <button
      className="settings-btn checkbox-btn"
      onClick={() => {
        updateSettings(tag, subtagClass, gameState);
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
