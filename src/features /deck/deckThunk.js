import { GAME, GAMEOVER_SUCCESS, IDLE, PAUSE } from "../../gameStateNames";
import { timeout } from "../../utils/helpers";
import { setGameState } from "../gameState/gameStateSlice";
import { setSettings } from "../settings/settingsSlice";
import { resetTimer, startTimer, stopTimer } from "../timers/timersSlice";
import { snakeLikeArrival, translateCards } from "../transfers/transfersSlice";
import {
  flipCardsBack,
  getShuffledArray,
  setPairsToWin,
  setStartNewGameCallCounter,
  setStartNewGamePending,
} from "./deckSlice";

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
    await dispatch(setStartNewGameCallCounter("INC"));
    const callNumber = getState().deck.startNewGameCallCounter;
    dispatch(setStartNewGamePending(true));
    await waitForDisplayDeck({ getState, dispatch, callNumber });
    await dispatch(translateCards("moveCardsAway"));
    await dispatch(setSettings());
    const { themesWereEqual } = getState().settings;
    if (!themesWereEqual) {
      await timeout(1000);
    }
    const {
      arrayLength,
      currentSize,
      settings: { themes: currentTheme },
    } = getState().settings;
    await dispatch(
      getShuffledArray({ arrayLength, currentSize, currentTheme })
    );
    await dispatch(resetTimer());
    // ///////////////////////
    // WAIT FOR DECK TRANSITION
    ///////////////////////////
    await dispatch(translateCards("moveToLeft"));
    await dispatch(snakeLikeArrival());
    return Promise.resolve();
  } catch (error) {
    return rejectWithValue(error.message);
  }
};

// ///////////////////////////////////////////////////////////
//  waitForDisplayDeck function
//  purpose: makes sure that only last call of starNewGame will be executed,
//  waits if previous call of startNewGame is still executing
//////////////////////////////////////////////////////////////
const waitForDisplayDeck = async ({ dispatch, getState, callNumber }) => {
  return new Promise((resolve, reject) => {
    const checkDisplayDeckStatus = () => {
      const counter = getState().deck.startNewGameCallCounter;
      const isExecuting = getState().deck.startNewGamePending;
      const snakeLikeArrivalPending =
        getState().transfers.snakeLikeArrivalPending;
      // if it is the last call of startNewGame we want to proceed
      if (callNumber === counter) {
        // if it the very first call or previous call is finished and snakeLikeArrival animation
        //after page is fully loaded is finished
        if ((!isExecuting || counter === 1) && !snakeLikeArrivalPending) {
          dispatch(setStartNewGameCallCounter(1));
          resolve("resolved");
        } else {
          setTimeout(checkDisplayDeckStatus, 100);
        }
      } else {
        // if it is snakeLikeArrival right after page load
        if (snakeLikeArrivalPending) {
          dispatch(setStartNewGamePending(false));
          // canceling previous calls of startNewGame to for not creating queue of calls
          reject("Display deck is currently executing");
        }
      }
    };
    checkDisplayDeckStatus();
  });
};
