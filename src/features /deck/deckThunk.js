import { GAME, GAMEOVER_SUCCESS, IDLE, PAUSE } from "../../gameStateNames";
import { timeout } from "../../utils/helpers";
import { setGameState } from "../gameState/gameStateSlice";
import { setSettings } from "../settings/settingsSlice";
import { resetTimer, startTimer, stopTimer } from "../timers/timersSlice";
import { snakeLikeArrival, translateCards } from "../transfers/transfersSlice";
import { flipCardsBack, getShuffledArray, setPairsToWin } from "./deckSlice";

export const cardFlipThunk = async (payload, thunkAPI) => {
  try {
    const gameState = thunkAPI.getState().gameState.gameState;
    const { index, cardIndex, lastFlippedCard } = payload;
    if (gameState === IDLE) {
      /////////////////////////////////////////////////////////
      // ADD START TIMER
      /////////////////////////////////////////////////////////
      thunkAPI.dispatch(setGameState(GAME));
      thunkAPI.dispatch(startTimer());
      const currentSize = thunkAPI.getState().settings?.currentSize;
      // thunkAPI.dispatch(setPairsToWin({ currentSize }));
      // CHANGE BACK
      thunkAPI.dispatch(setPairsToWin({ currentSize: 2 }));
      // CHANGE BACK
    }
    let cardsAreEqual = lastFlippedCard?.cardIndex === cardIndex;
    if (lastFlippedCard) {
      if (!cardsAreEqual) {
        thunkAPI.dispatch(flipCardsBack({ index, cardIndex, lastFlippedCard }));
      } else {
        const pairsToWin = thunkAPI.getState().deck.pairsToWin;
        if (pairsToWin === 1) {
          /////////////////////////////////////////////////////////
          // ADD STOP TIMER AND COMPARE CURRENT TIME WITH BEST TIME
          /////////////////////////////////////////////////////////
          thunkAPI.dispatch(setGameState(GAMEOVER_SUCCESS));
        }
        thunkAPI.dispatch(setPairsToWin());
      }
    }
    return Promise.resolve({ index, cardIndex, cardsAreEqual });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const flipCardsBackThunk = async (thunkAPI) => {
  try {
    await timeout(400);
    return Promise.resolve();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const startNewGameThunk = async ({
  dispatch,
  rejectWithValue,
  getState,
}) => {
  try {
    // ///////////////////
    // RECALCULATE coords
    /////////////////////
    await dispatch(translateCards("moveCardsAway"));
    dispatch(setSettings());
    dispatch(resetTimer());
    // ///////////////////////
    // WAIT FOR DECK TRANSITION
    ///////////////////////////
    const { arrayLength, currentSize } = getState().settings;
    console.log(arrayLength);
    const { shuffledArray } = getState().deck;
    console.log(shuffledArray);
    dispatch(getShuffledArray({ arrayLength, currentSize }));
    await dispatch(translateCards("moveToLeft"));
    await dispatch(snakeLikeArrival());
    return Promise.resolve();
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
