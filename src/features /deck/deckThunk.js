import { GAME, GAMEOVER_SUCCESS, IDLE } from "../../gameStateNames";
import { timeout } from "../../utils/helpers";
import { setGameState } from "../gameState/gameStateSlice";
import { startTimer } from "../timers/timersSlice";
import { flipCardsBack, setPairsToWin } from "./deckSlice";

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
