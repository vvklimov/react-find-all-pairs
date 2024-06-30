import {
  setPulseFlag,
  stopTimer,
  updateCurrentGameTime,
  setNewBestTime,
  resumeTimer,
  setLostFlag,
} from "./timersSlice";
import { setGameState } from "../gameState/gameStateSlice";
import {
  GAMEOVER_FAILURE,
  GAMEOVER_SUCCESS,
  PAUSE,
  GAME,
} from "../../gameStateNames";
import { setOnClickEnabled } from "../deck/deckSlice";
import { setShowGameMenu } from "../gameMenu/gameMenuSlice";
import { GetThunkAPI } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../../store";
import { ReversedTimerUnitFormat, TimerValues } from "../../utils/types";

export const startTimerThunk = async ({
  dispatch,
  getState,
  rejectWithValue,
}: GetThunkAPI<AsyncThunkConfig>) => {
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
        if (gameState === GAME && isPaused) {
          dispatch(resumeTimer());
        } else if (gameState === PAUSE && !isPaused) {
          dispatch(stopTimer());
        }

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

          if (currentTimeValue && targetTimeValue) {
            // if remains 5 seconds or less before time is up, then set pulse flag

            if (targetTimeValue - currentTimeValue <= 5000 && !pulseFlag) {
              dispatch(setPulseFlag(true));
            }
            // if player won
            if (gameState === GAMEOVER_SUCCESS) {
              dispatch(stopTimer());
              dispatch(setPulseFlag(false));
              dispatch(setOnClickEnabled(false));

              // if player set new record
              if (!bestTimeValue || currentTimeValue < bestTimeValue) {
                dispatch(setNewBestTime(size));
              }

              // if player won but didn't set new record
              dispatch(setShowGameMenu(true));

              // if time is up, then player lost
            } else if (currentTimeValue >= targetTimeValue) {
              dispatch(stopTimer());
              dispatch(setGameState(GAMEOVER_FAILURE));
              dispatch(setLostFlag(true));
              dispatch(setPulseFlag(false));
              dispatch(setOnClickEnabled(false));
              dispatch(setShowGameMenu(true));
            }
          }
        }
      }, 10);
      return Promise.resolve(newTimerInterval);
    }
  } catch (error) {
    return rejectWithValue({ error: `error in startTimerThunk: ${error}` });
  }
};
const timerUnitFormat = (timerValue: number): string => {
  if (timerValue < 10) return `0${timerValue}`;
  return `${timerValue}`;
};

const reversedTimerUnitFormat = (timer: TimerValues): number => {
  let { min, sec, msec }: ReversedTimerUnitFormat = timer;
  min = parseInt(min);
  sec = parseInt(sec);
  msec = parseInt(msec) * 10;
  const total = min * 60 * 1000 + sec * 1000 + msec;
  return total;
};
