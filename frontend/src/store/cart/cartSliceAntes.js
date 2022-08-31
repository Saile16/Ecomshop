import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action);
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      console.log(item, existItem);
      //   const itemIndex = state.cartItems.findIndex(
      //     (item) => item._id === action.payload._id
      //   );
      if (existItem) {
        // state.cartItems[itemIndex].qty == parseInt(action.payload.qty);

        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        // const tempProduct = {
        //   ...action.payload,
        //   qty: parseInt(action.payload.qty),
        // };
        state.cartItems.push(action.payload);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;
