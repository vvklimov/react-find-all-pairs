import { IDLE } from "../../gameStateNames";
import { timeout } from "../../utils/helpers";
import { flipAllCardsBack } from "../deck/deckSlice";
import { setShowGameMenu } from "../gameMenu/gameMenuSlice";
import { setGameState } from "../gameState/gameStateSlice";
import { updateCurrentPosition } from "./transfersSlice";

export const translateCardsThunk = async ({
  dispatch,
  rejectWithValue,
  getState,
  payload,
}) => {
  try {
    if (payload === "moveCardsAway") {
      const { flippedCards } = getState().deck;
      dispatch(setGameState(IDLE));
      dispatch(setShowGameMenu(false));
      await timeout(500);
      if (flippedCards.length > 0) {
        dispatch(flipAllCardsBack());
        await timeout(400);
      }
      dispatch(updateCurrentPosition("moveToCenter"));
      await timeout(500);
      dispatch(updateCurrentPosition("moveToRight"));
      await timeout(500);
    }
    return Promise.resolve();
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
