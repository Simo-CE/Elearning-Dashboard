import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "uiSlice",
  version: 1,
  storage,
  blacklist: [],
};

const initialState = {
  theme: "lightMode",
  sideBarIsOpen: true
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    navBarTheme: (state, data) => {
      state.theme = data.payload
    },
    sideBarStatus: (state, data) => {
      state.sideBarIsOpen = data.payload
    },
  },
});

export const { navBarTheme, sideBarStatus } = uiSlice.actions;

export default persistReducer(persistConfig, uiSlice.reducer);
