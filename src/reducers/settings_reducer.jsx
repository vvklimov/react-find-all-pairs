import { IDLE, SET_SETTINGS, UPDATE_SETTINGS } from "../actions";
import { setStorageItem } from "../utils/helpers";
import { settingsAreEqual } from "../context/settings_context";
const settings_reducer = (state, action) => {
  if (action.type === SET_SETTINGS) {
    const newSettings = state.tempSettings;
    setStorageItem("settings", newSettings);
    return { ...state, settings: newSettings, settingsAreEqual: true };
  }
  if (action.type === UPDATE_SETTINGS) {
    const { singleSettingName, singleSettingValue, gameState } = action.payload;
    if (state.tempSettings[singleSettingName] === singleSettingValue) {
      return state;
    }
    const newSettings = { ...state.settings };
    const newTempSettings = { ...state.tempSettings };
    if (singleSettingName === "other") {
      // in this case do not do the same for tempSettings, because it references the same nested property
      newSettings[singleSettingName][singleSettingValue] =
        !newSettings[singleSettingName][singleSettingValue];
      setStorageItem("settings", newSettings);
      const equal = settingsAreEqual(newSettings, newTempSettings);
      return {
        ...state,
        settings: newSettings,
        tempSettings: newTempSettings,
        settingsAreEqual: equal,
      };
    } else {
      if (gameState === IDLE && singleSettingName === "difficulty") {
        newSettings[singleSettingName] = singleSettingValue;
        newTempSettings[singleSettingName] = singleSettingValue;
        const equal = settingsAreEqual(newSettings, newTempSettings);
        setStorageItem("settings", newSettings);
        return {
          ...state,
          settings: newSettings,
          tempSettings: newTempSettings,
          settingsAreEqual: equal,
        };
      }
      if (
        singleSettingName === "themes" ||
        singleSettingName === "size" ||
        singleSettingName === "difficulty"
      ) {
        newTempSettings[singleSettingName] = singleSettingValue;
        const equal = settingsAreEqual(newSettings, newTempSettings);
        return {
          ...state,
          tempSettings: newTempSettings,
          settingsAreEqual: equal,
        };
      }
    }
  }
  throw new Error(`No Matching ${action.type} - action type`);
};

export default settings_reducer;
