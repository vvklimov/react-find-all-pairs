import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumber, timeout } from "../../utils/helpers";

const initialState = {
  shuffledArray: [],
  gridClassName: "",
  gridIntValue: null,
  cardWidth: "10px",
  cardHeight: "16px",
  deckMaxWidth: "",
  flippedCards: [],
  lastFlippedCard: null,
};

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
      const { currentSize, deckContainerHeight } = payload;
      let deckContainerMaxWidth, className;
      if (currentSize === 36) {
        if (window.innerWidth > 1000) {
          className = "grid-9columns";
        } else if (window.innerWidth > 600) {
          className = "grid-6columns";
        } else {
          className = "grid-4columns";
        }
        deckContainerMaxWidth = `${(deckContainerHeight * 16) / 9}px`;
      } else if (currentSize === 16) {
        className = "grid-4columns";
        deckContainerMaxWidth = `${deckContainerHeight}px`;
      } else if (currentSize === 20) {
        deckContainerMaxWidth = `${deckContainerHeight}px`;
        if (window.innerWidth > 600) {
          className = "grid-5columns";
        } else {
          className = "grid-4columns";
        }
      } else if (currentSize === 24) {
        deckContainerMaxWidth = `${(deckContainerHeight * 8) / 7}px`;
        if (window.innerWidth > 700) {
          className = "grid-6columns";
        } else {
          className = "grid-4columns";
        }
      }
      const numberOfColumns = parseInt(className.slice(5, 6));
      state.deckMaxWidth = deckContainerMaxWidth;
      state.gridClassName = className;
      state.gridIntValue = numberOfColumns;
    },
    setWidthToCards: (state, { payload }) => {
      const { wrapperWidth, wrapperHeight } = payload;
      if (wrapperWidth === 0 || wrapperHeight === 0) return state;
      const singleCardAspectRatio = 1.557;

      const wrapperAR = wrapperHeight / wrapperWidth;
      let width, height;
      if (wrapperAR > singleCardAspectRatio) {
        width = `100%`;
        height = `${wrapperWidth * singleCardAspectRatio}px`;
      } else {
        height = `100%`;
        width = `${wrapperHeight / singleCardAspectRatio}px`;
      }
      state.cardWidth = width;
      state.cardHeight = height;
    },
  },
});

export const { getShuffledArray, setupGrid, setWidthToCards } =
  deckSlice.actions;
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
