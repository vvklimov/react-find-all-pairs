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
  heightAspectRatio: true,
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
      const {
        left: heroLeft,
        right: heroRight,
        bottom: heroBottom,
        top: heroTop,
        centerY: heroCenterY,
        centerX: heroCenterX,
      } = payload;
      state.heroCenter = {
        heroLeft,
        heroRight,
        heroBottom,
        heroTop,
        heroCenterX,
        heroCenterY,
      };
    },
    setCardsAspectRatio: (state, { payload }) => {
      //  we only need one card
      const {
        right: cardWrapperRight,
        left: cardWrapperLeft,
        top: cardWrapperTop,
        bottom: cardWrapperBottom,
      } = payload[0];
      const cardWrapperHeight = cardWrapperBottom - cardWrapperTop;
      const cardWrapperWidth = cardWrapperRight - cardWrapperLeft;
      const cardWrapperAR = cardWrapperHeight / cardWrapperWidth;
      if (cardWrapperAR <= 1.567) {
        state.heightAspectRatio = true;
      } else {
        state.heightAspectRatio = false;
      }
    },

    setCardsTransitions: (state, { payload }) => {
      state.cardsCenter = {};
      state.moveToCenter = {};
      state.moveToRight = {};
      state.moveToLeft = {};
      payload.forEach((card) => {
        const {
          index,
          centerX: cardCenterX,
          centerY: cardCenterY,
          right: cardRight,
          left: cardLeft,
          top: cardTop,
          bottom: cardBottom,
        } = card;
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
      });
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
    builder.addCase(snakeLikeArrival.fulfilled, (state) => {
      state.snakeLikeArrivalPending = false;
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
  setCardsAspectRatio,
} = transfersSlice.actions;
export default transfersSlice.reducer;
