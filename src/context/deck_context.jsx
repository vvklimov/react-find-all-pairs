import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/deck_reducer";
const initialState = {
  shuffledArray: [],
};
import { GET_SHUFFLED_ARRAY } from "../actions";
const DeckContext = createContext();

export const DeckProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getShuffledArray(16, 16);
  }, []);
  const getShuffledArray = (arrayLength, currentSize) => {
    dispatch({
      type: GET_SHUFFLED_ARRAY,
      payload: { arrayLength, currentSize },
    });
  };
  return (
    <DeckContext.Provider value={{ ...state, getShuffledArray }}>
      {children}
    </DeckContext.Provider>
  );
};
export const useDeckContext = () => useContext(DeckContext);
