import {
  setPulseFlag,
  stopTimer,
  updateCurrentGameTime,
  setNewBestTime,
} from "./timersSlice";
import { setGameState } from "../gameState/gameStateSlice";
import { GAMEOVER_FAILURE, GAMEOVER_SUCCESS } from "../../gameStateNames";
import { setOnClickEnabled } from "../deck/deckSlice";

export const startTimerThunk = async ({ dispatch, getState }) => {
  try {
    let milliseconds = 0,
      msFormat = 0,
      seconds = 0,
      minutes = 0;
    const { timerInterval, targetTime, bestTime } = getState().timers;
    const {
      settings: { size },
    } = getState().settings;

    const targetTimeValue = reversedTimerUnitFormat(targetTime);
    const bestTimeValue = reversedTimerUnitFormat(bestTime);
    if (!timerInterval) {
      const newTimerInterval = setInterval(() => {
        const { gameState } = getState().gameState;
        const { isPaused, pulseFlag } = getState().timers;
        if (!isPaused) {
          milliseconds += 10;
          msFormat = milliseconds / 10;
          if (milliseconds >= 1000) {
            milliseconds = 0;
            msFormat = 0;
            seconds++;
            if (seconds === 60) {
              seconds = 0;
              minutes++;
            }
          }
          const newTimerValues = {
            min: timerUnitFormat(minutes),
            sec: timerUnitFormat(seconds),
            msec: timerUnitFormat(msFormat),
          };
          dispatch(updateCurrentGameTime(newTimerValues));
          const currentTimeValue = reversedTimerUnitFormat(newTimerValues);
          if (targetTimeValue - currentTimeValue <= 5000 && !pulseFlag) {
            dispatch(setPulseFlag(true));
          }
          if (gameState === GAMEOVER_SUCCESS) {
            dispatch(stopTimer());
            dispatch(setPulseFlag(false));
            dispatch(setOnClickEnabled(false));
            if (!bestTimeValue || currentTimeValue < bestTimeValue) {
              dispatch(setNewBestTime(size));
            }
          }
          if (currentTimeValue >= targetTimeValue) {
            dispatch(stopTimer());
            dispatch(setGameState(GAMEOVER_FAILURE));
            dispatch(setPulseFlag(false));
            dispatch(setOnClickEnabled(false));
          }
        }
      }, 10);
      return Promise.resolve({ newTimerInterval });
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
const timerUnitFormat = (timerValue) => {
  if (timerValue < 10) return `0${timerValue}`;
  return `${timerValue}`;
};

const reversedTimerUnitFormat = (timer) => {
  let { min, sec, msec } = timer;
  min = parseInt(min) || null;
  sec = parseInt(sec) || null;
  msec = parseInt(msec) * 10 || null;
  const total = min * 60 * 1000 + sec * 1000 + msec;
  return total ? total : null;
};
