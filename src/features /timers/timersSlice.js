import { createSlice } from "@reduxjs/toolkit";
import { timers, targetTimeValues, navTags } from "../../utils/data";
import { getStorageItem, setStorageItem } from "../../utils/helpers";

const initialState = {
  defaultTimers: timers,
  targetTime: timers.targetTime.defaultValues,
  currentGameTime: timers.currentGameTime.defaultValues,
  bestTime: timers.bestTime.defaultValues,
};
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
  },
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

export const { setupTimers } = timersSlice.actions;
export default timersSlice.reducer;
