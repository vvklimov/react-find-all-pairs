import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomNumber, timeout } from "../../utils/helpers";
import { cardFlipThunk, flipCardsBackThunk } from "./deckThunk";
import { setGameState } from "../gameState/gameStateSlice";
import { GAMEOVER_SUCCESS } from "../../gameStateNames";

const initialState = {
  shuffledArray: [],
  gridClassName: "",
  gridIntValue: null,
  flippedCards: [],
  lastFlippedCard: null,
  testingValue: [],
  onClickEnabled: true,
  pairsToWin: null,
};

export const cardFlip = createAsyncThunk(
  "deck/cardFlip",
  async (payload, thunkAPI) => {
    return cardFlipThunk(payload, thunkAPI);
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
        state.pairsToWin = state.pairsToWin - 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(cardFlip.fulfilled, (state, { payload }) => {
        const { index, cardIndex, cardsAreEqual } = payload;
        console.log(cardsAreEqual);
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
      });
  },
});

export const { getShuffledArray, setupGrid, setPairsToWin } = deckSlice.actions;
export default deckSlice.reducer;

//TODO
//  const cardFlip = async (event, index) => {
//    dispatch({ type: CARD_FLIP, payload: { event, index, setGameState } });
//  }; else if (action.type === CARD_FLIP) {
//     // setGameState(GAME);
//     const singleCard = action.payload.event.target.parentElement.parentElement;
//     const pairId = parseInt(singleCard.dataset.pairId);
//     const cardIndex = action.payload.index;
//     // console.log(cardIndex);
//     const newFlippedCards = state.flippedCards;
//     newFlippedCards.push(cardIndex);
//     singleCard.classList.add("single-card-flip");
//     let newLastFlippedCard = state.lastFlippedCard;
//     console.log(newLastFlippedCard);
//     if (!newLastFlippedCard) {
//       newLastFlippedCard = pairId;
//     }
//     // else {}
//     setTimeout(() => {
//       console.log(newLastFlippedCard);
//       action.payload.setGameState(GAME);
//       return {
//         ...state,
//         flippedCards: newFlippedCards,
//         lastFlippedCard: newLastFlippedCard,
//       };
//     }, 400);
//     // console.log(pairId);
//     // console.log(action.payload.event.target.parentElement.parentElement);
//     // console.log();
//     // console.log("hello");
//     // singleCard.classList.add("single-card-flip");
//     // console.log(singleCard.classList);
//     // return state;
//   }
//   return state;
//
