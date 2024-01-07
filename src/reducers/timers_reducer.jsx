import { targetTimeValues, navTags } from "../utils/data";
import { getStorageItem, setStorageItem } from "../utils/helpers";
import { SETUP_TIMERS } from "../actions";
const timers_reducer = (state, action) => {
  if (action.type === SETUP_TIMERS) {
    const settings = action.payload.settings;
    const name = action.payload.name;
    let min, sec, msec;
    if (name === "targetTime") {
      let targetTimeName = `${settings.difficulty}${settings.size.slice(0, 2)}`;
      const { mins, secs, msecs } = targetTimeValues[targetTimeName];
      min = mins;
      sec = secs;
      msec = msecs;
      return { ...state, targetTime: { min, sec, msec } };
    } else if (name === "bestTime") {
      const bestTimeValues = getBestTime();
      return { ...state, bestTime: bestTimeValues[settings.size] };
    } else {
      return state;
    }
  }
  return state;
};

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
export default timers_reducer;
