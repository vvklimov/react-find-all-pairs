import { GetThunkAPI } from "@reduxjs/toolkit";
import { IDLE } from "../../gameStateNames";
import { timeout } from "../../utils/helpers";
import { TranslateCardsCommands } from "../../utils/types";
import { flipAllCardsBack, setOnClickEnabled } from "../deck/deckSlice";
import { setGameState } from "../gameState/gameStateSlice";
import { setShowSidebar } from "../sidebar/sidebarSlice";
import {
  moveToCardsDefaultPosition,
  setSnakeLikeArrivalPending,
  setVisibility,
  updateCurrentPosition,
} from "./transfersSlice";
import { AsyncThunkConfig } from "../../store";

export const translateCardsThunk = async (
  payload: TranslateCardsCommands,
  { dispatch, rejectWithValue, getState }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
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
      await dispatch(updateCurrentPosition("moveToCenter"));
      await timeout(500);
      await dispatch(updateCurrentPosition("moveToRight"));
      await timeout(500);
      await dispatch(setVisibility(false));
    } else if (payload === "moveToLeft") {
      await dispatch(setVisibility(false));
      await dispatch(updateCurrentPosition("moveToLeft"));
      await timeout(100);
      await dispatch(setVisibility(true));
    }
    return Promise.resolve();
  } catch (error) {
    return rejectWithValue({ error: `error in translateCardsThunk` });
  }
};
export const snakeLikeArrivalThunk = async (
  firstLoad: boolean = false,
  { dispatch, rejectWithValue, getState }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    if (firstLoad) {
      await dispatch(setSnakeLikeArrivalPending(true));
    }
    const { onClickEnabled } = getState().deck;
    if (onClickEnabled) {
      dispatch(setOnClickEnabled(false));
    }
    await dispatch(setVisibility(true));
    const permutedArray = getState().deck.permutedArray;
    for (const card of permutedArray) {
      await dispatch(moveToCardsDefaultPosition(card));
      await timeout(200);
    }
    await timeout(300);

    return Promise.resolve(dispatch(setOnClickEnabled(true)));
  } catch (error) {
    return rejectWithValue({ error: `error in snakeLikeArrivalThunk` });
  }
};
