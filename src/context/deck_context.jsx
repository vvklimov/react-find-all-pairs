import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import reducer from "../reducers/deck_reducer";
import { useSettingsContext } from "./settings_context";
const initialState = {
  shuffledArray: [],
  gridClassName: "",
  girdIntValue: null,
  cardWidth: "10px",
  cardHeight: "16px",
  deckMaxWidth: "",
  deckContainerRef: null,
  wrapperDimensions: { width: 0, height: 0 },
};
import {
  GET_SHUFFLED_ARRAY,
  SETUP_GRID,
  SET_WIDTH_TO_CARDS,
  SET_WRAPPER_DIMENSIONS,
} from "../actions";
import { debounce } from "../utils/helpers";
const DeckContext = createContext();

export const DeckProvider = ({ children }) => {
  const { currentSize, arrayLength } = useSettingsContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  state.deckContainerRef = useRef();
  useEffect(() => {
    getShuffledArray(arrayLength, currentSize);
  }, [currentSize]);
  useEffect(() => {
    const handleResize = debounce(() => {
      setupGrid(currentSize);
      setWidthToCards(state.wrapperDimensions);
    }, 500);
    setupGrid(currentSize);
    if (state.wrapperDimensions.width !== 0 && state.wrapperDimensions !== 0) {
      setWidthToCards(state.wrapperDimensions);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    currentSize,
    state.wrapperDimensions.width,
    state.wrapperDimensions.height,
  ]);
  const getShuffledArray = (arrayLength, currentSize) => {
    dispatch({
      type: GET_SHUFFLED_ARRAY,
      payload: { arrayLength, currentSize },
    });
  };
  const setupGrid = (currentSize) => {
    dispatch({ type: SETUP_GRID, payload: { currentSize } });
  };
  const setWidthToCards = (wrapperDimensions) => {
    dispatch({ type: SET_WIDTH_TO_CARDS, payload: { wrapperDimensions } });
  };
  const setWrapperDimensions = (wrapperDimensions) => {
    dispatch({ type: SET_WRAPPER_DIMENSIONS, payload: { wrapperDimensions } });
  };
  return (
    <DeckContext.Provider
      value={{
        ...state,
        getShuffledArray,
        setWidthToCards,
        setWrapperDimensions,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};
export const useDeckContext = () => useContext(DeckContext);
