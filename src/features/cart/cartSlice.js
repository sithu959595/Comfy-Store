import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};
function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
}
const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      // console.log(action.payload);
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      state.cartTotal += product.amount * product.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("items added to the cart");
    },
    clearCart: (state) => {
      // console.log(action.payload);
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      // console.log(action.payload);
      const { cartID } = action.payload;
      // state.cartItems.filter((item) => item.cartID !== cartID);
      const removedProduct = state.cartItems.find(
        (item) => item.cartID === cartID
      );
      state.numItemsInCart -= removedProduct.amount;
      state.cartTotal -= removedProduct.price * removedProduct.amount;
      state.cartItems = state.cartItems.filter(
        (item) => item.cartID !== cartID
      );

      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Items removed");
    },
    editItem: (state, action) => {
      // console.log(action.payload);
      const { cartID, amount } = action.payload;
      const edittedProduct = state.cartItems.find(
        (item) => item.cartID === cartID
      );
      state.numItemsInCart += amount - edittedProduct.amount;
      state.cartTotal +=
        edittedProduct.price * (amount - edittedProduct.amount);
      edittedProduct.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item editted");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
