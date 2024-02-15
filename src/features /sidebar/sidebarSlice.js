import { createSlice } from "@reduxjs/toolkit";
import playSound, { BTN_CLICK } from "../../utils/playSound";

const initialState = {
  showSidebar: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShowSidebar: (state, { payload }) => {
      playSound(BTN_CLICK);
      state.showSidebar = payload;
    },
  },
});

export const { setShowSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
