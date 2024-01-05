import { createContext, useState, useContext, useReducer } from "react";
import { IDLE } from "../actions";
import reducer from "../reducers/gameState_reducer";
const GameStateContext = createContext();

const initialState = { gameState: IDLE };

export const GameStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setGameState = (gameState) => {
    dispatch({ type: gameState });
  };
  return (
    <GameStateContext.Provider value={{ ...state, setGameState }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameStateContext = () => useContext(GameStateContext);
