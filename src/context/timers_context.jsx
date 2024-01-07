import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/timers_reducer";
import { timers } from "../utils/data";

const TimersContext = createContext();

const initialState = {
  defaultValues: timers,
};

export const TimersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimersContext.Provider value={{ ...state }}>
      {children}
    </TimersContext.Provider>
  );
};

export const useTimersContext = () => useContext(TimersContext);
