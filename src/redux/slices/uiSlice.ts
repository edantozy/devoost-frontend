import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  isMenuOpen: boolean;
}

const initialState: UIState = {
  isMenuOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = uiSlice.actions;

export default uiSlice.reducer;
