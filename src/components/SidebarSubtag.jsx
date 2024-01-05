import { useGameStateContext } from "../context/gameState_context";
import { useSettingsContext } from "../context/settings_context";

const SidebarSubtag = ({ subtagClass, subtagName, tag }) => {
  const { tempSettings, updateSettings } = useSettingsContext();
  const { gameState } = useGameStateContext();
  // console.log(updateSettings);
  let checked =
    tempSettings[tag] === subtagClass || tempSettings[tag][subtagClass];
  return (
    <li>
      <button
        className="settings-btn checkbox-btn"
        onClick={() => {
          updateSettings(tag, subtagClass, gameState);
          // console.log(tag);
          // console.log(subtagClass);
        }}
        // data-tag={tag}
        // data-subtag={subtagClass}
      >
        <div className="checkbox-btn-middle-part">
          <div
            className={`checkbox-btn-middle-part ${checked ? "checked" : ""}`}
          ></div>
        </div>
      </button>
      {subtagName}
    </li>
  );
};
export default SidebarSubtag;
