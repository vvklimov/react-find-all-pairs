import { getRandomNumber } from "../utils/helpers";
import { GET_SHUFFLED_ARRAY } from "../actions";
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
  }
  return state;
};

export default deck_reducer;
