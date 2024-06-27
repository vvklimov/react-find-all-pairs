import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getRandomNumber } from "../../utils/helpers";
import {
  cardFlipThunk,
  flipCardsBackThunk,
  startNewGameThunk,
} from "./deckThunk";
import {
  SettingsThemeClass,
  type DeckState,
  CallCounterCommandNames,
  LastFlippedCard,
} from "../../utils/types";
import { AsyncThunkConfig } from "../../store";
const initialState: DeckState = {
  shuffledArray: [],
  gridClassName: "",
  gridIntValue: 4,
  flippedCards: [],
  lastFlippedCard: null,
  onClickEnabled: false,
  pairsToWin: null,
  permutatedArray: [],
  startNewGamePending: false,
  startNewGameCallCounter: 0,
  foundCards: [],
};

const popBuffer = (permutatedArray: number[], buffer: number[]) => {
  if (buffer.length > 0) {
    permutatedArray.push(...buffer);
    buffer.length = 0;
  }
  return;
};

export type CardFlipProps = LastFlippedCard & { cardsAreEqual: boolean };

export const cardFlip = createAsyncThunk<
  CardFlipProps,
  CardFlipProps,
  AsyncThunkConfig
>("deck/cardFlip", async (payload, thunkAPI) => {
  return cardFlipThunk(payload, thunkAPI);
});

export const startNewGame = createAsyncThunk(
  "deck/startNewGame",
  async (_, thunkAPI) => {
    return startNewGameThunk(thunkAPI);
  }
);
export const flipCardsBack = createAsyncThunk(
  "deck/flipCardsBack",
  async (_, thunkAPI) => {
    return flipCardsBackThunk(thunkAPI);
  }
);
const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    getShuffledArray: (
      state,
      {
        payload,
      }: PayloadAction<{
        arrayLength: number;
        currentSize: number;
        currentTheme: SettingsThemeClass;
      }>
    ) => {
      const { arrayLength, currentSize, currentTheme } = payload;
      const randomIndexes: number[] = [];
      let randomNumber: number;
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
    setupGrid: (state, { payload }: PayloadAction<{ currentSize: number }>) => {
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
      } else {
        className = "grid-4columns";
      }
      const numberOfColumns = parseInt(className.slice(5, 6));
      state.gridIntValue = numberOfColumns;
      state.gridClassName = className;
    },
    setPairsToWin: (
      state,
      { payload }: PayloadAction<{ currentSize: number } | null>
    ) => {
      if (payload) {
        state.pairsToWin = payload.currentSize / 2;
      } else if (state.pairsToWin) {
        state.pairsToWin -= 1;
      }
    },
    setOnClickEnabled: (state, { payload }: PayloadAction<boolean>) => {
      state.onClickEnabled = payload;
    },
    flipAllCardsBack: (state) => {
      state.flippedCards = [];
      state.foundCards = [];
      state.lastFlippedCard = null;
    },
    setOddEvenRow: (state) => {
      const shuffledArray = [...state.shuffledArray];
      const buffer: number[] = [];
      const permutatedArray: number[] = [];

      shuffledArray.forEach((_, index) => {
        if (Math.ceil((index + 1) / state.gridIntValue) % 2 !== 0) {
          // in case previous index was in even row we want to push items from the buffer
          popBuffer(permutatedArray, buffer);
          // add to the end of permutated array
          permutatedArray.push(index);
        } else {
          // adding indexes to the beginning of the buffer array
          buffer.unshift(index);
        }
      });
      popBuffer(permutatedArray, buffer);
      state.permutatedArray = permutatedArray;
    },
    setStartNewGamePending: (state, { payload }: PayloadAction<boolean>) => {
      state.startNewGamePending = payload;
    },
    setStartNewGameCallCounter: (
      state,
      { payload }: PayloadAction<CallCounterCommandNames | number>
    ) => {
      if (payload === "INC") state.startNewGameCallCounter += 1;
      else if (payload === "DEC") state.startNewGameCallCounter -= 1;
      else if (payload === "RESET") state.startNewGameCallCounter = 0;
      else state.startNewGameCallCounter = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        cardFlip.fulfilled,
        (state, { payload }: PayloadAction<CardFlipProps>) => {
          const { index, cardIndex, cardsAreEqual } = payload;

          state.flippedCards.push(index);
          if (cardsAreEqual) {
            state.lastFlippedCard = null;
            state.foundCards = state.flippedCards;
          } else {
            state.lastFlippedCard = { index, cardIndex };
          }
        }
      )
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
