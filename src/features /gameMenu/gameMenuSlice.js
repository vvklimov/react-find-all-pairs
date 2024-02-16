import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setShowGameMenuThunk } from "./gameMenuThunk";
const initialState = {
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
  async (payload, { getState, dispatch, rejectWithValue }) => {
    return setShowGameMenuThunk({
      dispatch,
      getState,
      rejectWithValue,
      payload,
    });
  }
);
const gameMenuSlice = createSlice({
  name: "gameMenu",
  initialState,
  reducers: {
    setTextContent: (state, { payload }) => {
      state.textContent = payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(setShowGameMenu.fulfilled, (state, { payload }) => {
      state.show = payload;
    }),
});

export const { setTextContent } = gameMenuSlice.actions;
export default gameMenuSlice.reducer;
