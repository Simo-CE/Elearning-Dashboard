import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "localizationSlice",
  version: 1,
  storage,
  blacklist: [],
};

const initialState = {
  selectedLanguage :{},
  defaultLanguageId:null
};

export const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    updateLocalLanguage: (state, {payload}) => {
      state.selectedLanguage = payload
    },
    setNewDefaultLanguage: (state, {payload}) => {
      state.defaultLanguageId = payload
    },
  },
});

export const { updateLocalLanguage, setNewDefaultLanguage} = localizationSlice.actions;

export default persistReducer(persistConfig, localizationSlice.reducer);

