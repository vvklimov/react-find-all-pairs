import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { translateCardsThunk } from "./transfersThunk";

const initialState = {
  heroCenter: {},
  cardsCenter: {},
  moveToCenter: {},
  moveToRight: {},
  moveToLeft: {},
  currentPosition: {},
  moveToDefaultPosition: "translate(0px, 0px)",
};

export const translateCards = createAsyncThunk(
  "transfers/translateCards",
  async (payload, { getState, dispatch, rejectWithValue }) => {
    return translateCardsThunk({
      payload,
      getState,
      dispatch,
      rejectWithValue,
    });
  }
);

const transfersSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    setHeroCenter: (state, { payload }) => {
      state.heroCenter = payload;
    },
    setCardsTransitions: (state, { payload }) => {
      const {
        index,
        cardCenterX,
        cardCenterY,
        cardRight,
        cardLeft,
        cardTop,
        cardBottom,
      } = payload;
      const { heroCenterX, heroCenterY, heroRight, heroLeft } =
        state.heroCenter;
      state.cardsCenter[index] = { cardCenterX, cardCenterY };
      state.moveToCenter[index] = {
        destCoord: `translate(${heroCenterX - cardCenterX}px, ${
          heroCenterY - cardCenterY
        }px)`,
      };
      state.moveToLeft[index] = {
        destCoord: `translate(${heroLeft - cardRight - 20}px, ${
          heroCenterY - cardCenterY
        }px)`,
      };
      state.moveToRight[index] = {
        destCoord: `translate(${heroRight - cardLeft + 20}px, ${
          heroCenterY - cardCenterY
        }px)`,
      };
      //
      //
      //   state.currentPosition[index] = {
      //     destCoord: `translate(${heroRight - cardLeft}px, ${
      //       heroCenterY - cardCenterY + 20
      //     }px)`,
      //   };
    },
    updateCurrentPosition: (state, { payload }) => {
      state.currentPosition = state[payload];
    },
  },
  extraReducers: (builder) =>
    builder.addCase(translateCards.fulfilled, (state, { payload }) => {
      console.log("hello there");
    }),
});

export const { setHeroCenter, setCardsTransitions, updateCurrentPosition } =
  transfersSlice.actions;
export default transfersSlice.reducer;
