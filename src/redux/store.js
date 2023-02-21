import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { api } from "../services/api";
import authSlice from "./authSlice";
import uiSlice from "./uiSlice";
import localizationSlice from "./localizationSlice";
import cartSlice from "./AddToCart";
import searchCart from "./SearchCart";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    localization: localizationSlice,
    cart: cartSlice,
    search: searchCart,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);
