import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setStorageItem, getStorageItem } from "../../utils/helpers";
import { defaultSettings, decks } from "../../utils/data";
import { IDLE } from "../../gameStateNames";

export const getCurrentDeckArrayLength = (settings) =>
  decks[settings.themes].cardsSrc.length;

export const settingsAreEqual = (settings, tempSettings) =>
  JSON.stringify(settings) === JSON.stringify(tempSettings);

export const getCurrentSize = (settings) => parseInt(settings.size.slice(0, 2));

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
    themesWereEqual: true,
  };
};

const initialState = getSettings();

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (payload, thunkAPI) => {
    const { tag: name, subtagClass: value } = payload;
    const gameState = thunkAPI.getState().gameState.gameState;
    return { name, value, gameState };
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state) => {
      setStorageItem("settings", state.tempSettings);
      state.themesWereEqual =
        state.settings.themes === state.tempSettings.themes;
      state.settings = state.tempSettings;
      state.settingsAreEqual = true;
      state.currentSize = getCurrentSize(state.tempSettings);
      state.arrayLength = getCurrentDeckArrayLength(state.tempSettings);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSettings.fulfilled, (state, { payload }) => {
      const { name, value, gameState } = payload;
      if (name === "other") {
        state.settings[name][value] = !state.settings[name][value];
        state.tempSettings[name][value] = !state.tempSettings[name][value];
        setStorageItem("settings", state.settings);
        state.settingsAreEqual = settingsAreEqual(
          state.settings,
          state.tempSettings
        );
      } else {
        if (gameState === IDLE && name === "difficulty") {
          state.settings[name] = value;
          state.tempSettings[name] = value;
          state.settingsAreEqual = settingsAreEqual(
            state.tempSettings,
            state.settings
          );
          setStorageItem("settings", state.settings);
        } else if (
          name === "themes" ||
          name === "size" ||
          name === "difficulty"
        ) {
          state.tempSettings[name] = value;
          state.settingsAreEqual = settingsAreEqual(
            state.settings,
            state.tempSettings
          );
        }
      }
    });
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
