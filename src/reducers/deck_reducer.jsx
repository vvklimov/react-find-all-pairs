import { getRandomNumber } from "../utils/helpers";
import { GET_SHUFFLED_ARRAY, SETUP_GRID, SET_WIDTH_TO_CARDS } from "../actions";
const deck_reducer = (state, action) => {
  if (action.type === GET_SHUFFLED_ARRAY) {
    const arrayLength = action.payload.arrayLength;
    const currentSize = action.payload.currentSize;
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
    return { ...state, shuffledArray: randomIndexes };
  } else if (action.type === SETUP_GRID) {
    const currentSize = action.payload.currentSize;
    let className;
    const deckContainer = state.deckContainerRef.current;
    let deckContainerMaxWidth;
    if (currentSize === 36) {
      if (window.innerWidth > 1000) {
        className = "grid-9columns";
      } else if (window.innerWidth > 600) {
        className = "grid-6columns";
      } else {
        className = "grid-4columns";
      }
      deckContainerMaxWidth = `${(deckContainer.clientHeight * 16) / 9}px`;
    } else if (currentSize === 16) {
      className = "grid-4columns";
      deckContainerMaxWidth = `${deckContainer.clientHeight}px`;
    } else if (currentSize === 20) {
      deckContainerMaxWidth = `${deckContainer.clientHeight}px`;
      if (window.innerWidth > 600) {
        className = "grid-5columns";
      } else {
        className = "grid-4columns";
      }
    } else if (currentSize === 24) {
      deckContainerMaxWidth = `${(deckContainer.clientHeight * 8) / 7}px`;
      if (window.innerWidth > 700) {
        className = "grid-6columns";
      } else {
        className = "grid-4columns";
      }
    }
    const numberOfColumns = parseInt(className.slice(5, 6));
    return {
      ...state,
      deckMaxWidth: deckContainerMaxWidth,
      gridClassName: className,
      girdIntValue: numberOfColumns,
    };
  } else if (action.type === SET_WIDTH_TO_CARDS) {
    const currentSize = action.payload.currentSize;
    const wrapper = state.singleCardWrapperRef?.current[0];
    const card = state.singleCardRef?.current[0];
    const singleCardAspectRatio = 1.557;
    let width, height;
    console.log(state.singleCardWrapperRef);
    console.log(card);
    if (!wrapper || !card) {
      return state;
    }
    let wrapperAR = wrapper.clientHeight / wrapper.clientWidth;
    if (wrapperAR > singleCardAspectRatio) {
      width = `100%`;
      height = `${card.clientHeight * singleCardAspectRatio}px`;
    } else {
      height = `100%`;
      width = `${card.clientHeight / singleCardAspectRatio}px`;
    }
    return { ...state, cardWidth: width, cardHeight: height };
  }
  return state;
};

export default deck_reducer;
