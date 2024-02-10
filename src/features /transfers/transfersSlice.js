import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { translateCardsThunk, snakeLikeArrivalThunk } from "./transfersThunk";

const initialState = {
  heroCenter: {},
  cardsCenter: {},
  moveToCenter: {},
  moveToRight: {},
  moveToLeft: {},
  currentPosition: {},
  moveToDefaultPosition: "translate(0px, 0px)",
  visible: false,
  isLoaded: false,
  snakeLikeArrivalPending: false,
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
export const snakeLikeArrival = createAsyncThunk(
  "transfers/snakeLikeArrival",
  async (payload, { getState, dispatch, rejectWithValue }) => {
    return snakeLikeArrivalThunk({
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
        currentSize,
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
        destCoord: `translate(${-heroRight / 2 - cardRight - 20}px, ${
          heroCenterY - cardCenterY
        }px)`,
      };
      state.moveToRight[index] = {
        destCoord: `translate(${heroRight - cardLeft + 20}px, ${
          heroCenterY - cardCenterY
        }px)`,
      };
      // console.log(state.heroCenter?.heroCenterX);
      //
      //
      // state.currentPosition[index] = {
      //   destCoord: `translate(${heroLeft - cardRight - 20}px, ${
      //     heroCenterY - cardCenterY
      //   }px)`,
      // };
      // if (Object.keys(state.moveToRight).length === currentSize) {
      //   state.isLoaded = true;
      // }
    },
    updateCurrentPosition: (state, { payload }) => {
      state.currentPosition = state[payload];
    },
    setVisibility: (state, { payload }) => {
      state.visible = payload;
    },
    moveToCardsDefaultPosition: (state, { payload }) => {
      delete state.currentPosition[payload];
    },
    setIsLoaded: (state, { payload }) => {
      state.isLoaded = payload;
    },
    setSnakeLikeArrivalPending: (state, { payload }) => {
      state.snakeLikeArrivalPending = payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(translateCards.fulfilled, (state, { payload }) => {
        // console.log("translate cards fulfilled");
      })
      .addCase(snakeLikeArrival.fulfilled, (state, { payload }) => {
        // console.log("snakeLikeArrival fulfilled");
        state.snakeLikeArrivalPending = false;
      })
      .addCase(snakeLikeArrival.pending, (state, { payload }) => {
        // console.log("snakeLikeArrival fulfilled");
        // state.snakeLikeArrivalPending = true;
      }),
});

export const {
  setHeroCenter,
  setCardsTransitions,
  updateCurrentPosition,
  setVisibility,
  moveToCardsDefaultPosition,
  setIsLoaded,
  setSnakeLikeArrivalPending,
} = transfersSlice.actions;
export default transfersSlice.reducer;
