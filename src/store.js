import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./features/cart/cartSlice";
import { userSliceReducer } from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userSliceReducer,
  },
});
