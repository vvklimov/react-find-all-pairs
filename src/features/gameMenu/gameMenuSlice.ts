import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setShowGameMenuThunk } from "./gameMenuThunk";
import { GameMenuState, GameMenuTextContent } from "../../utils/types";
const initialState: GameMenuState = {
  show: false,
  textContent: {
    textContentName: "default",
    currentGameTime: {
      min: "00",
      sec: "00",
      msec: "00",
    },
  },
};

export const setShowGameMenu = createAsyncThunk(
  "gameMenu/setShowGameMenu",
  async (payload: boolean, thunkAPI) => {
    return setShowGameMenuThunk(payload, thunkAPI);
  }
);
const gameMenuSlice = createSlice({
  name: "gameMenu",
  initialState,
  reducers: {
    setTextContent: (
      state,
      { payload }: PayloadAction<GameMenuTextContent>
    ) => {
      state.textContent = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      setShowGameMenu.fulfilled,
      (state, { payload }: PayloadAction<boolean>) => {
        state.show = payload;
      }
    );
  },
});

export const { setTextContent } = gameMenuSlice.actions;
export default gameMenuSlice.reducer;
