import { createContext, useContext, useReducer } from "react";
import { getStorageItem, setStorageItem } from "../utils/helpers";
import { defaultSettings } from "../utils/data";
import reducer, { getCurrentSize } from "../reducers/settings_reducer";
import { SET_SETTINGS, UPDATE_SETTINGS } from "../actions";
import { decks } from "../utils/data";

export const getCurrentDeckArrayLength = (settings) =>
  decks[settings.themes].cardsSrc.length;
export const settingsAreEqual = (settings, tempSettings) =>
  JSON.stringify(settings) === JSON.stringify(tempSettings);
const getSettings = () => {
  let settings = getStorageItem("settings");
  if (!settings) {
    settings = setStorageItem("settings", defaultSettings);
  }
  let tempSettings = { ...settings };
  return {
    settings,
    tempSettings,
    settingsAreEqual: settingsAreEqual(settings, tempSettings),
    currentSize: getCurrentSize(settings),
    arrayLength: getCurrentDeckArrayLength(settings),
  };
};

const initialState = getSettings();

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setSettings = () => {
    dispatch({ type: SET_SETTINGS });
  };
  const updateSettings = (singleSettingName, singleSettingValue, gameState) => {
    dispatch({
      type: UPDATE_SETTINGS,
      payload: { singleSettingName, singleSettingValue, gameState },
    });
  };
  return (
    <SettingsContext.Provider value={{ ...state, setSettings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
