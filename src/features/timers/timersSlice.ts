import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { timers, targetTimeValues, navTags } from "../../utils/data";
import { getStorageItem, setStorageItem } from "../../utils/helpers";
import { startTimerThunk } from "./timersThunk";
import {
  BestTimeLocalStorageFormat,
  Settings,
  SettingsSizeClass,
  TargetTimeValues,
  TimerName,
  TimerValues,
  TimersState,
} from "../../utils/types";
const initialState: TimersState = {
  defaultTimers: timers,
  targetTime: timers.targetTime.defaultValues,
  currentGameTime: timers.currentGameTime.defaultValues,
  bestTime: timers.bestTime.defaultValues,
  timerInterval: null,
  isPaused: false,
  pulseFlag: false,
  newRecordFlag: false,
  lostFlag: false,
};
export const startTimer = createAsyncThunk(
  "timers/startTimer",
  async (_, thunkAPI) => {
    return startTimerThunk(thunkAPI);
  }
);
const timersSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
    setupTimers: (
      state,
      { payload }: PayloadAction<{ name: TimerName; settings: Settings }>
    ) => {
      const { name, settings } = payload;
      let min, sec, msec;
      if (name === "targetTime") {
        let targetTimeName = `${settings.difficulty}${settings.size.slice(
          0,
          2
        )}` as keyof TargetTimeValues;
        const { mins, secs, msecs } = targetTimeValues[targetTimeName];
        min = mins;
        sec = secs;
        msec = msecs;
        state.targetTime = { min, sec, msec };
      } else if (name === "bestTime") {
        const bestTimeValues = getBestTime();
        state.bestTime = bestTimeValues[settings.size];
      }
    },

    updateCurrentGameTime: (state, { payload }: PayloadAction<TimerValues>) => {
      state.currentGameTime = payload;
    },

    stopTimer: (state) => {
      state.isPaused = true;
    },

    resumeTimer: (state) => {
      state.isPaused = false;
    },

    setPulseFlag: (state, { payload }: PayloadAction<boolean>) => {
      state.pulseFlag = payload;
    },

    resetTimer: (state) => {
      if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
      }
      state.currentGameTime = state.defaultTimers.currentGameTime.defaultValues;
      state.isPaused = false;
      state.pulseFlag = false;
      state.newRecordFlag = false;
      state.lostFlag = false;
    },

    setNewBestTime: (
      state,
      { payload: currentSize }: PayloadAction<SettingsSizeClass>
    ) => {
      state.bestTime = state.currentGameTime;
      state.newRecordFlag = true;
      const previousBestTime = getStorageItem("bestTime");
      previousBestTime[currentSize] = state.currentGameTime;
      setStorageItem("bestTime", previousBestTime);
    },

    setLostFlag: (state, { payload }: PayloadAction<boolean>) => {
      state.lostFlag = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      startTimer.fulfilled,
      (state, { payload }: PayloadAction<number | undefined>) => {
        if (payload) {
          state.timerInterval = payload;
        }
      }
    );
  },
});

const getBestTime = (): BestTimeLocalStorageFormat => {
  let bestTime = getStorageItem("bestTime");
  if (!bestTime) {
    bestTime = {};
    navTags.map((item) => {
      if (item.tag === "size") {
        item.subtags.forEach((dickSize) => {
          bestTime[dickSize.subtagClass] = { min: "--", sec: "--", msec: "--" };
        });
      }
    });
    setStorageItem("bestTime", bestTime);
  }
  return bestTime as BestTimeLocalStorageFormat;
};

export const {
  setupTimers,
  updateCurrentGameTime,
  stopTimer,
  resumeTimer,
  setPulseFlag,
  setNewBestTime,
  resetTimer,
  setLostFlag,
} = timersSlice.actions;
export default timersSlice.reducer;
