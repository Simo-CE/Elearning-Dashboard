import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "searchCart",
  version: 1,
  storage,
  blacklist: [],
};

const initialState = {
  searchedValue: "",
};

export const searchCart = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchValue: (state, { payload }) => {
      state.searchedValue = payload;
    },
  },
});

export const { searchValue } = searchCart.actions;

export default persistReducer(persistConfig, searchCart.reducer);
