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
  cardWidth: "",
  cardHeight: "",
  deckMaxWidth: "",
  deckContainerRef: null,
  singleCardWrapperRef: null,
  singleCardRef: null,
};
import { GET_SHUFFLED_ARRAY, SETUP_GRID, SET_WIDTH_TO_CARDS } from "../actions";
import { debounce } from "../utils/helpers";
const DeckContext = createContext();

export const DeckProvider = ({ children }) => {
  const { currentSize, arrayLength } = useSettingsContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  state.deckContainerRef = useRef();
  state.singleCardRef = useRef([]);
  state.singleCardWrapperRef = useRef([]);
  // console.log(state.singleCardWrapperRef.current);
  useEffect(() => {
    getShuffledArray(arrayLength, currentSize);
  }, [currentSize]);
  useEffect(() => {
    const handleResize = debounce(() => {
      setupGrid(currentSize);
      setWidthToCards();
    }, 500);

    setupGrid(currentSize);
    setWidthToCards();
    console.log(state.singleCardWrapperRef);
    // FIX TO MAKE IT WORK ON INITIAL RENDER
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentSize, state.singleCardRef, state.singleCardWrapperRef]);
  const getShuffledArray = (arrayLength, currentSize) => {
    dispatch({
      type: GET_SHUFFLED_ARRAY,
      payload: { arrayLength, currentSize },
    });
  };
  const setupGrid = (currentSize) => {
    dispatch({ type: SETUP_GRID, payload: { currentSize } });
  };
  const setWidthToCards = (currentSize) => {
    dispatch({ type: SET_WIDTH_TO_CARDS, payload: { currentSize } });
  };
  return (
    <DeckContext.Provider
      value={{ ...state, getShuffledArray, setWidthToCards }}
    >
      {children}
    </DeckContext.Provider>
  );
};
export const useDeckContext = () => useContext(DeckContext);
