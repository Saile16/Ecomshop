import { configureStore } from "@reduxjs/toolkit";
import { userAuthSlice } from "./auth/authSlice";
import { cartSlice } from "./cart/cartSlice";
import { productDetailsSlice } from "./products/productDetails";
import { productsSlice } from "./products/productsSlice";
import { userRegisterSlice } from "./register/registerSlice";
import { userProfileSlice } from "./userProfile/profileSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartSlice.reducer,
    userAuth: userAuthSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userProfile: userProfileSlice.reducer,
  },
});
