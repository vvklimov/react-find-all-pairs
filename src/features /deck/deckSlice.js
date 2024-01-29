import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomNumber, timeout } from "../../utils/helpers";
import { cardFlipThunk } from "./deckThunk";

const initialState = {
  shuffledArray: [],
  gridClassName: "",
  gridIntValue: null,
  flippedCards: [],
  lastFlippedCard: null,
};

export const cardFlip = createAsyncThunk(
  "deck/cardFlip",
  async (payload, thunkAPI) => {
    // console.log("HI");
    // const { tag: name, subtagClass: value } = payload;
    // console.log(payload);
    // const gameState = thunkAPI.getState().gameState.gameState;
    return cardFlipThunk(payload, thunkAPI);
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
  },
  extraReducers: (builder) => {
    builder.addCase(cardFlip.fulfilled, (state, { payload }) => {
      const { index, cardIndex } = payload;
      state.flippedCards.push(index);
      state.lastFlippedCard = { index, cardIndex };

      return state;
    });
  },
});

export const { getShuffledArray, setupGrid } = deckSlice.actions;
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
