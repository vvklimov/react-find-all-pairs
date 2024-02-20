import { configureStore } from "@reduxjs/toolkit";
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
