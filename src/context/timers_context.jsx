import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/timers_reducer";
import { timers } from "../utils/data";
import { SETUP_TIMERS } from "../actions";

const TimersContext = createContext();

const initialState = {
  defaultTimers: timers,
  targetTime: timers.targetTime.defaultValues,
  currentGameTime: timers.currentGameTime.defaultValues,
  bestTime: timers.bestTime.defaultValues,
};

export const TimersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setupTimers = (name, settings) => {
    dispatch({ type: SETUP_TIMERS, payload: { name, settings } });
  };
  return (
    <TimersContext.Provider value={{ ...state, setupTimers }}>
      {children}
    </TimersContext.Provider>
  );
};

export const useTimersContext = () => useContext(TimersContext);
