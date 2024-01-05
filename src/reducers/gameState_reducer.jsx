import {
  IDLE,
  GAME,
  PAUSE,
  RESUME,
  GAMEOVER_FAILURE,
  GAMEOVER_SUCCESS,
} from "../actions";

const gameStateReducer = (state, action) => {
  if (action.type === state.gameState) {
    return state;
  }
  if (action.type === IDLE) {
    return { ...state, gameState: IDLE };
  }
  if (action.type === GAME && state.gameState === IDLE) {
    return { ...state, gameState: GAME };
  }
  if (state.gameState === GAME) {
    if (action.type === PAUSE) {
      return { ...state, gameState: PAUSE };
    }
    if (action.type === GAMEOVER_FAILURE) {
      return { ...state, gameState: GAMEOVER_FAILURE };
    }
    if (action.type === GAMEOVER_SUCCESS) {
      return { ...state, gameState: GAMEOVER_SUCCESS };
    } else {
      return state;
    }
  }
  if (state.gameState === PAUSE) {
    if (action.type === RESUME) {
      return { ...state, gameState: GAME };
    } else {
      return state;
    }
  }
  if (
    state.gameState === GAMEOVER_FAILURE ||
    state.gameState === GAMEOVER_SUCCESS
  ) {
    return state;
  }
  throw new Error(`No matching ${action.type} action type`);
};

export default gameStateReducer;
