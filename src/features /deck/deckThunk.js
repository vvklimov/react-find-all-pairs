import { GAME, IDLE } from "../../gameStateNames";
import { timeout } from "../../utils/helpers";
import { setGameState } from "../gameState/gameStateSlice";

export const cardFlipThunk = async (payload, thunkAPI) => {
  try {
    const gameState = thunkAPI.getState().gameState.gameState;
    const { e, index, cardIndex } = payload;
    if (gameState === IDLE) thunkAPI.dispatch(setGameState(GAME));
    // console.log(thunkAPI.getState().gameState.gameState);
    // const lastFlippedCard = thunkAPI.getState().deck.lastFlippedCard;
    // console.log(lastFlippedCard);
    // const singleCard = e.target.parentElement.parentElement;
    // singleCard.classList.add("single-card-flip");
    // if (!lastFlippedCard) {
    // await timeout(300);
    //   return Promise.resolve({ index, cardIndex });
    // } else {
    //   if (lastFlippedCard.cardIndex === cardIndex) {
    //     console.log("equal");
    //     // SET FOUND FLAG
    //   } else {
    //     console.log("not equal");
    //     // FLIP CARDS BACK
    //     // AND SET lastFlippedCard to null
    //   }
    // }
    // await timeout(500);
    return Promise.resolve({ index, cardIndex });
  } catch (error) {
    return Promise.reject();
  }
};
