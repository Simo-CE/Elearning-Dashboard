import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "cartSlice",
  version: 1,
  storage,
  blacklist: [],
};

const initialState = {
  cart: [],
  defaultCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.cart = [...state.cart, payload];
    },
    emptyCart: (state) => {
      state.cart = [];
    },
    removeFromCart: (state, { payload }) => {
      state.cart.splice(
        state.cart.findIndex((arrow) => arrow.id === payload),
        1
      );
    },
    removeSpecificFromCart: (state, { payload }) => {

      payload.find(function (e) {
        state?.cart.filter(function (cv) {
          state.cart.splice(cv.id === e.id, 1);
        });
      });
    },
  },
});

export const { setCart, emptyCart, removeFromCart, removeSpecificFromCart } =
  cartSlice.actions;

export default persistReducer(persistConfig, cartSlice.reducer);
