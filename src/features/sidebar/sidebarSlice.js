import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShowSidebar: (state, { payload }) => {
      state.showSidebar = payload;
    },
  },
});

export const { setShowSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
