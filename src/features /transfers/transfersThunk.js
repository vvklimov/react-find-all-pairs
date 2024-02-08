import { IDLE } from "../../gameStateNames";
import { timeout } from "../../utils/helpers";
import { flipAllCardsBack, setOnClickEnabled } from "../deck/deckSlice";
import { setShowGameMenu } from "../gameMenu/gameMenuSlice";
import { setGameState } from "../gameState/gameStateSlice";
import { setShowSidebar } from "../sidebar/sidebarSlice";
import {
  moveToCardsDefaultPosition,
  setVisibility,
  updateCurrentPosition,
} from "./transfersSlice";

export const translateCardsThunk = async ({
  dispatch,
  rejectWithValue,
  getState,
  payload,
}) => {
  try {
    dispatch(setShowGameMenu(false));
    if (payload === "moveCardsAway") {
      const { showSidebar } = getState().sidebar;
      if (showSidebar) {
        dispatch(setShowSidebar(false));
      }
      const { flippedCards } = getState().deck;
      dispatch(setGameState(IDLE));
      await timeout(500);
      if (flippedCards.length > 0) {
        dispatch(flipAllCardsBack());
        await timeout(400);
      }
      dispatch(updateCurrentPosition("moveToCenter"));
      await timeout(500);
      dispatch(updateCurrentPosition("moveToRight"));
      await timeout(500);
      dispatch(setVisibility(false));
    } else if (payload === "moveToLeft") {
      await dispatch(updateCurrentPosition("moveToLeft"));
      dispatch(setVisibility(true));
    }
    return Promise.resolve();
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
export const snakeLikeArrivalThunk = async ({
  dispatch,
  rejectWithValue,
  getState,
}) => {
  try {
    const { onClickEnabled } = getState().deck;
    if (onClickEnabled) {
      dispatch(setOnClickEnabled(false));
    }
    dispatch(setVisibility(true));
    const permutatedArray = getState().deck.permutatedArray;
    for (const card of permutatedArray) {
      dispatch(moveToCardsDefaultPosition(card));
      await timeout(200);
    }
    await timeout(300);

    return Promise.resolve(dispatch(setOnClickEnabled(true)));
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
