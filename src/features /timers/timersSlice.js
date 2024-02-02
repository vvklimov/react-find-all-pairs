import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { timers, targetTimeValues, navTags } from "../../utils/data";
import { getStorageItem, setStorageItem } from "../../utils/helpers";
import { startTimerThunk } from "./timersThunk";
const initialState = {
  defaultTimers: timers,
  targetTime: timers.targetTime.defaultValues,
  currentGameTime: timers.currentGameTime.defaultValues,
  bestTime: timers.bestTime.defaultValues,
  timerInterval: false,
  isPaused: false,
  pulseFlag: false,
  newRecordFlag: false,
};
export const startTimer = createAsyncThunk(
  "timers/startTimer",
  async (_, { getState, dispatch, rejectWithValue }) => {
    return startTimerThunk({ dispatch, getState, rejectWithValue });
  }
);
const timersSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
    setupTimers: (state, { payload }) => {
      const { name, settings } = payload;
      let min, sec, msec;
      if (name === "targetTime") {
        let targetTimeName = `${settings.difficulty}${settings.size.slice(
          0,
          2
        )}`;
        const { mins, secs, msecs } = targetTimeValues[targetTimeName];
        min = mins;
        sec = secs;
        msec = msecs;
        state.targetTime = { min, sec, msec };
      } else if (name === "bestTime") {
        const bestTimeValues = getBestTime();
        state.bestTime = bestTimeValues[settings.size];
      } else return state;
    },
    updateCurrentGameTime: (state, { payload }) => {
      state.currentGameTime = payload;
    },
    stopTimer: (state) => {
      state.isPaused = true;
    },
    resumeTimer: (state) => {
      state.isPaused = false;
    },
    setPulseFlag: (state, { payload }) => {
      state.pulseFlag = payload;
    },
    removeTimer: (state) => {
      state.timerInterval = null;
    },
    setNewBestTime: (state, { payload: currentSize }) => {
      state.bestTime = state.currentGameTime;
      state.newRecordFlag = true;
      const previousBestTime = getStorageItem("bestTime");
      previousBestTime[currentSize] = state.currentGameTime;
      setStorageItem("bestTime", previousBestTime);
    },
  },
  extraReducers: (builder) =>
    builder.addCase(startTimer.fulfilled, (state, { payload }) => {
      state.timerInterval = payload.newTimerInterval;
    }),
});

const getBestTime = () => {
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
  return bestTime;
};

export const {
  setupTimers,
  updateCurrentGameTime,
  stopTimer,
  resumeTimer,
  setPulseFlag,
  setNewBestTime,
} = timersSlice.actions;
export default timersSlice.reducer;
