import { createSlice } from "@reduxjs/toolkit";
import {
  IDLE,
  PAUSE,
  GAMEOVER_FAILURE,
  GAMEOVER_SUCCESS,
  RESUME,
  GAME,
} from "../../gameStateNames";

const initialState = { gameState: IDLE };

const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    setGameState: (state, { payload: newGameState }) => {
      if (newGameState === IDLE) state.gameState = IDLE;
      else if (newGameState === GAME && state.gameState === IDLE)
        state.gameState = GAME;
      else if (state.gameState === GAME) {
        if (
          newGameState === PAUSE ||
          newGameState === GAMEOVER_FAILURE ||
          newGameState === GAMEOVER_SUCCESS
        )
          state.gameState = newGameState;
      } else if (state.gameState === PAUSE && newGameState === RESUME)
        state.gameState = GAME;
      return state;
    },
  },
});

export const { setGameState } = gameStateSlice.actions;
export default gameStateSlice.reducer;
