import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import settingsReducer from "./features/settings/settingsSlice";
import gameStateReducer from "./features/gameState/gameStateSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import timersReducer from "./features/timers/timersSlice";
import deckReducer from "./features/deck/deckSlice";
import gameMenuReducer from "./features/gameMenu/gameMenuSlice";
import transfersReducer from "./features/transfers/transfersSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    gameState: gameStateReducer,
    sidebar: sidebarReducer,
    timers: timersReducer,
    deck: deckReducer,
    gameMenu: gameMenuReducer,
    transfers: transfersReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ReduxStore = {
  getState: () => RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}>();

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: { error: string };
};
