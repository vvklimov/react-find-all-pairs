import { GAMEOVER_FAILURE, GAMEOVER_SUCCESS } from "../../gameStateNames";
import { setTextContent } from "./gameMenuSlice";
import playSound, { BTN_CLICK } from "../../utils/playSound";

export const setShowGameMenuThunk = async ({
  payload,
  dispatch,
  getState,
  rejectWithValue,
}) => {
  try {
    if (payload) {
      if (payload.sound) {
        playSound(BTN_CLICK);
      }
      const { gameState } = getState().gameState;
      const { newRecordFlag, currentGameTime } = getState().timers;
      const { settingsAreEqual } = getState().settings;

      let textContentName;
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
    return rejectWithValue(error.message);
  }
};
