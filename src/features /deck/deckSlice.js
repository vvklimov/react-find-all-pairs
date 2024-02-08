import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomNumber, timeout } from "../../utils/helpers";
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
  testingValue: [],
  onClickEnabled: false,
  pairsToWin: null,
  permutatedArray: [],
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
      const { arrayLength, currentSize } = payload;
      let randomIndexes = [];
      let randomNumber;
      // choosing cards from the pool
      while (randomIndexes.length !== currentSize) {
        if (arrayLength) {
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(cardFlip.fulfilled, (state, { payload }) => {
        const { index, cardIndex, cardsAreEqual } = payload;
        state.flippedCards.push(index);
        cardsAreEqual
          ? (state.lastFlippedCard = null)
          : (state.lastFlippedCard = { index, cardIndex });
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
      .addCase(startNewGame.fulfilled, (state, { payload }) => {
        console.log("fires");
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
} = deckSlice.actions;
export default deckSlice.reducer;
