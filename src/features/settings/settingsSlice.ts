import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setStorageItem, getStorageItem } from "../../utils/helpers";
import { defaultSettings, decks } from "../../utils/data";
import { IDLE } from "../../gameStateNames";
import {
  type GameStateName,
  type Settings,
  type SubtagClass,
  type Tag,
  type SettingsThemeClass,
  type SettingsSizeClass,
  type SettingsDifficultyClass,
  type SettingsOtherClass,
} from "../../utils/types";
import { RootState } from "../../store";
export const getCurrentDeckArrayLength = (settings: Settings): number =>
  decks[settings.themes].cardsSrc.length;

export const settingsAreEqual = (settings: Settings, tempSettings: Settings) =>
  JSON.stringify(settings) === JSON.stringify(tempSettings);

export const getCurrentSize = (settings: Settings) =>
  parseInt(settings.size.slice(0, 2));

type SettingsState = {
  settings: Settings;
  tempSettings: Settings;
  settingsAreEqual: boolean;
  currentSize: number;
  arrayLength: number;
  themesWereEqual: boolean;
};
const getSettings = (): SettingsState => {
  let settings = getStorageItem("settings");
  if (!settings) {
    settings = setStorageItem("settings", defaultSettings);
  }
  const tempSettings = { ...settings };
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

type UpdateSettingsPayload = {
  tag: Tag;
  subtagClass: SubtagClass;
};
type UpdateSettingsReturnValue = {
  name: Tag;
  value: SubtagClass;
  gameState: GameStateName;
};
export const updateSettings = createAsyncThunk<
  UpdateSettingsReturnValue,
  UpdateSettingsPayload,
  { state: RootState }
>("settings/updateSettings", async (payload, { getState }) => {
  const { tag: name, subtagClass: value } = payload;
  const gameState = getState().gameState.gameState;
  return { name, value, gameState };
});

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
    builder.addCase(
      updateSettings.fulfilled,
      (state, { payload }: PayloadAction<UpdateSettingsReturnValue>) => {
        const { name, value, gameState } = payload;
        if (name === "other") {
          const settingsOtherValue = value as SettingsOtherClass;

          state.settings[name][settingsOtherValue] =
            !state.settings[name][settingsOtherValue];

          state.tempSettings[name][settingsOtherValue] =
            !state.tempSettings[name][settingsOtherValue];
          setStorageItem("settings", state.settings);
          state.settingsAreEqual = settingsAreEqual(
            state.settings,
            state.tempSettings
          );
        } else {
          if (gameState === IDLE && name === "difficulty") {
            const settingsDifficultyValue = value as SettingsDifficultyClass;
            state.settings[name] = settingsDifficultyValue;
            state.tempSettings[name] = settingsDifficultyValue;
            state.settingsAreEqual = settingsAreEqual(
              state.tempSettings,
              state.settings
            );
            setStorageItem("settings", state.settings);
          } else if (name === "themes") {
            state.tempSettings[name] = value as SettingsThemeClass;
          } else if (name === "size") {
            state.tempSettings[name] = value as SettingsSizeClass;
          } else if (name === "difficulty") {
            state.tempSettings[name] = value as SettingsDifficultyClass;
          }
          state.settingsAreEqual = settingsAreEqual(
            state.settings,
            state.tempSettings
          );
        }
      }
    );
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
