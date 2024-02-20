import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomNumber } from "../../utils/helpers";
import {
  cardFlipThunk,
  flipCardsBackThunk,
  startNewGameThunk,
} from "./deckThunk";

const initialState = {
  shuffledArray: [],
  gridClassName: "",
  gridIntValue: null,
  flippedCards: [],
  lastFlippedCard: null,
  onClickEnabled: false,
  pairsToWin: null,
  permutatedArray: [],
  startNewGamePending: false,
  startNewGameCallCounter: 0,
  foundCards: [],
};

export const cardFlip = createAsyncThunk(
  "deck/cardFlip",
  async (payload, thunkAPI) => {
    return cardFlipThunk(payload, thunkAPI);
  }
);
export const startNewGame = createAsyncThunk(
  "deck/startNewGame",
  async (_, { getState, dispatch, rejectWithValue }) => {
    return startNewGameThunk({ getState, dispatch, rejectWithValue });
  }
);
export const flipCardsBack = createAsyncThunk(
  "deck/flipCardsBack",
  async (thunkAPI) => {
    return flipCardsBackThunk(thunkAPI);
  }
);
const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    getShuffledArray: (state, { payload }) => {
      const { arrayLength, currentSize, currentTheme } = payload;
      let randomIndexes = [];
      let randomNumber;
      // choosing cards from the pool
      while (randomIndexes.length !== currentSize) {
        if (currentTheme === "surprise-me" || currentTheme === "people") {
          randomNumber = getRandomNumber(0, currentSize / 2);
        } else if (arrayLength) {
          randomNumber = getRandomNumber(0, arrayLength);
        } else {
          randomNumber = getRandomNumber(0, currentSize);
        }
        if (!randomIndexes.includes(randomNumber)) {
          randomIndexes.push(randomNumber);
          randomIndexes.push(randomNumber);
        }
      }
      // shuffle cards order
      for (let i = 0; i < randomIndexes.length; i++) {
        let randomNumber = getRandomNumber(0, randomIndexes.length);
        let temp = randomIndexes[i];
        randomIndexes[i] = randomIndexes[randomNumber];
        randomIndexes[randomNumber] = temp;
      }
      state.shuffledArray = randomIndexes;
    },
    setupGrid: (state, { payload }) => {
      const { currentSize } = payload;
      let className;
      if (currentSize === 36) {
        if (window.innerWidth > 1000) {
          className = "grid-9columns";
        } else if (window.innerWidth > 600) {
          className = "grid-6columns";
        } else {
          className = "grid-4columns";
        }
      } else if (currentSize === 16) {
        className = "grid-4columns";
      } else if (currentSize === 20) {
        if (window.innerWidth > 600) {
          className = "grid-5columns";
        } else {
          className = "grid-4columns";
        }
      } else if (currentSize === 24) {
        if (window.innerWidth > 700) {
          className = "grid-6columns";
        } else {
          className = "grid-4columns";
        }
      }
      const numberOfColumns = parseInt(className.slice(5, 6));
      state.gridClassName = className;
      state.gridIntValue = numberOfColumns;
    },
    setPairsToWin: (state, { payload }) => {
      if (payload) {
        state.pairsToWin = payload.currentSize / 2;
      } else {
        state.pairsToWin -= 1;
      }
    },
    setOnClickEnabled: (state, { payload }) => {
      state.onClickEnabled = payload;
    },
    flipAllCardsBack: (state) => {
      state.flippedCards = [];
      state.foundCards = [];
      state.lastFlippedCard = null;
    },
    setOddEvenRow: (state) => {
      const shuffledArray = [...state.shuffledArray];
      const oddEvenRowArray = shuffledArray.map((_, index) => {
        if (Math.ceil((index + 1) / state.gridIntValue) % 2 !== 0) {
          return "odd-row";
        } else {
          return "even-row";
        }
      });
      const buffer = [];
      const permutatedArray = [];
      for (let i = 0; i < shuffledArray.length; i++) {
        if (oddEvenRowArray[i] === "odd-row") {
          while (buffer.length !== 0) {
            permutatedArray.push(buffer.pop());
          }
          permutatedArray.push(i);
        } else {
          buffer.push(i);
        }
      }
      while (buffer.length !== 0) {
        permutatedArray.push(buffer.pop());
      }
      state.permutatedArray = permutatedArray;
    },
    setStartNewGamePending: (state, { payload }) => {
      state.startNewGamePending = payload;
    },
    setStartNewGameCallCounter: (state, { payload }) => {
      if (payload === "INC") state.startNewGameCallCounter += 1;
      else if (payload === "DEC") state.startNewGameCallCounter -= 1;
      else if (payload === "RESET") state.startNewGameCallCounter = 0;
      else state.startNewGameCallCounter = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(cardFlip.fulfilled, (state, { payload }) => {
        const { index, cardIndex, cardsAreEqual } = payload;
        state.flippedCards.push(index);
        if (cardsAreEqual) {
          state.lastFlippedCard = null;
          state.foundCards = state.flippedCards;
        } else {
          state.lastFlippedCard = { index, cardIndex };
        }
      })
      .addCase(flipCardsBack.pending, (state) => {
        state.onClickEnabled = false;
      })
      .addCase(flipCardsBack.fulfilled, (state) => {
        state.flippedCards.pop();
        state.flippedCards.pop();
        state.lastFlippedCard = null;
        state.onClickEnabled = true;
      })
      .addCase(startNewGame.fulfilled, (state) => {
        state.startNewGamePending = false;
        if (state.startNewGameCallCounter === 1) {
          state.startNewGameCallCounter = 0;
        }
      });
  },
});

export const {
  getShuffledArray,
  setupGrid,
  setPairsToWin,
  setOnClickEnabled,
  flipAllCardsBack,
  setOddEvenRow,
  setStartNewGamePending,
  setStartNewGameCallCounter,
} = deckSlice.actions;
export default deckSlice.reducer;
