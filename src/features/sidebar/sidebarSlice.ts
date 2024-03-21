import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SidebarState = { showSidebar: boolean };
const initialState: SidebarState = {
  showSidebar: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setShowSidebar: (state, { payload }: PayloadAction<boolean>) => {
      state.showSidebar = payload;
    },
  },
});

export const { setShowSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
