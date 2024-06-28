import { GetThunkAPI } from "@reduxjs/toolkit/react";
import { GAMEOVER_FAILURE, GAMEOVER_SUCCESS } from "../../gameStateNames";
import { setTextContent } from "./gameMenuSlice";
import { AsyncThunkConfig } from "../../store";
import { GameMenuTextContentName } from "../../utils/types";

export const setShowGameMenuThunk = async (
  payload: boolean,
  { getState, dispatch, rejectWithValue }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    if (payload) {
      const { gameState } = getState().gameState;
      const { newRecordFlag, currentGameTime } = getState().timers;
      const { settingsAreEqual } = getState().settings;

      let textContentName: GameMenuTextContentName;
      if (gameState === GAMEOVER_SUCCESS) {
        if (newRecordFlag) {
          textContentName = "newRecord";
        } else {
          textContentName = "won";
        }
      } else if (gameState === GAMEOVER_FAILURE) {
        textContentName = "lost";
      } else if (!settingsAreEqual) {
        textContentName = "applyNewSettings";
      } else {
        textContentName = "default";
      }
      dispatch(setTextContent({ textContentName, currentGameTime }));
    }
    return Promise.resolve(payload);
  } catch (error) {
    return rejectWithValue({
      error: `error in setShowGameMenuThunk: ${error}`,
    });
  }
};
