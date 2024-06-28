import {
  GAME,
  GAMEOVER_SUCCESS,
  IDLE,
  PAUSE,
  RESUME,
} from "../../gameStateNames";
import { timeout } from "../../utils/helpers";
import { setGameState } from "../gameState/gameStateSlice";
import { setSettings } from "../settings/settingsSlice";
import { resetTimer, startTimer } from "../timers/timersSlice";
import { snakeLikeArrival, translateCards } from "../transfers/transfersSlice";
import {
  flipCardsBack,
  getShuffledArray,
  setPairsToWin,
  setStartNewGameCallCounter,
  setStartNewGamePending,
} from "./deckSlice";
import { AsyncThunkConfig } from "../../store";
import { CardFlipProps } from "./deckSlice";
import { GetThunkAPI } from "@reduxjs/toolkit";
export const cardFlipThunk = async (
  payload: CardFlipProps,
  { dispatch, getState, rejectWithValue }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const gameState = getState().gameState.gameState;
    if (gameState === PAUSE) {
      dispatch(setGameState(RESUME));
    }
    const lastFlippedCard = getState().deck.lastFlippedCard;
    const { index, cardIndex } = payload;
    if (gameState === IDLE) {
      dispatch(setGameState(GAME));
      dispatch(startTimer());
      const currentSize = getState().settings?.currentSize;
      dispatch(setPairsToWin({ currentSize }));
    }
    let cardsAreEqual = lastFlippedCard?.cardIndex === cardIndex;
    if (lastFlippedCard) {
      if (!cardsAreEqual) {
        dispatch(flipCardsBack());
      } else {
        const pairsToWin = getState().deck.pairsToWin;
        // we will flip the last card
        if (pairsToWin === 1) {
          dispatch(setGameState(GAMEOVER_SUCCESS));
        }
        // decrement pairs to win
        dispatch(setPairsToWin(null));
      }
    }
    return Promise.resolve({
      index,
      cardIndex,
      cardsAreEqual,
    }) as Promise<CardFlipProps>;
  } catch (error) {
    return rejectWithValue({
      error: `error in cardFlipThunk: ${error}`,
    });
  }
};

export const flipCardsBackThunk = async ({
  rejectWithValue,
}: GetThunkAPI<AsyncThunkConfig>) => {
  try {
    await timeout(400);
    return Promise.resolve();
  } catch (error) {
    return rejectWithValue({
      error: `error in flipCardsBackThunk: ${error}`,
    });
  }
};
export const startNewGameThunk = async ({
  dispatch,
  rejectWithValue,
  getState,
}: GetThunkAPI<AsyncThunkConfig>) => {
  try {
    dispatch(setStartNewGameCallCounter("INC"));
    const callNumber = getState().deck.startNewGameCallCounter;
    dispatch(setStartNewGamePending(true));
    await waitForDisplayDeck(callNumber, {
      getState,
      dispatch,
    } as GetThunkAPI<AsyncThunkConfig>);
    await dispatch(translateCards("moveCardsAway"));
    dispatch(setSettings());
    const { themesWereEqual } = getState().settings;
    if (!themesWereEqual) {
      await timeout(1000);
    }
    const {
      arrayLength,
      currentSize,
      settings: { themes: currentTheme },
    } = getState().settings;
    dispatch(getShuffledArray({ arrayLength, currentSize, currentTheme }));
    await dispatch(resetTimer());
    await dispatch(translateCards("moveToLeft"));
    await timeout(500);
    await dispatch(snakeLikeArrival(false));
    return Promise.resolve();
  } catch (error) {
    return rejectWithValue({
      error: `error in startNewGameThunk: ${error}`,
    });
  }
};

// ///////////////////////////////////////////////////////////
//  waitForDisplayDeck function
//  purpose: makes sure that only last call of starNewGame will be executed,
//  waits if previous call of startNewGame is still executing
//////////////////////////////////////////////////////////////
const waitForDisplayDeck = async (
  callNumber: number,
  { dispatch, getState }: GetThunkAPI<AsyncThunkConfig>
) => {
  return new Promise((resolve, reject) => {
    const checkDisplayDeckStatus = () => {
      const counter = getState().deck.startNewGameCallCounter;
      const isExecuting = getState().deck.startNewGamePending;
      const snakeLikeArrivalPending =
        getState().transfers.snakeLikeArrivalPending;
      // if it is the last call of startNewGame we want to proceed
      if (callNumber === counter) {
        // if it the very first call or previous call and snakeLikeArrival animation is finished
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
