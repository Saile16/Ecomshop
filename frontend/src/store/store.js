import { configureStore } from "@reduxjs/toolkit";
import { userAuthSlice } from "./auth/authSlice";
import { cartSlice } from "./cart/cartSlice";
import { productDetailsSlice } from "./products/productDetails";
import { productsSlice } from "./products/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartSlice.reducer,
    userAuth: userAuthSlice.reducer,
  },
});
