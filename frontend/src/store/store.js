import { configureStore } from "@reduxjs/toolkit";
import { productDetailsSlice } from "./products/productDetails";
import { productsSlice } from "./products/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetails: productDetailsSlice.reducer,
  },
});
