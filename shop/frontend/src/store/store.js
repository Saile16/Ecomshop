import { configureStore } from "@reduxjs/toolkit";
import { userAuthSlice } from "./auth/authSlice";
import { cartSlice } from "./cart/cartSlice";
import { orderDeliveredSlice } from "./order/orderDeliveredSlice";
import { orderDetailsSlice } from "./order/orderDetails";
import { orderListSlice } from "./order/orderList";
import { orderListAdminSlice } from "./order/orderListAdminSlice";
import { orderPaySlice } from "./order/orderPay";
import { orderSlice } from "./order/orderSlice";
import { productCreateReviewSlice } from "./products/productCreateReviewSlice";
import { productCreateSlice } from "./products/productCreateSlice";
import { productDeleteSlice } from "./products/productDeleteSlice";
import { productDetailsSlice } from "./products/productDetails";
import { productsSlice } from "./products/productsSlice";
import { productTopRatedSlice } from "./products/productTopRatedSlice";
import { productUpdateSlice } from "./products/productUpdateSlice";
import { userRegisterSlice } from "./register/registerSlice";
import { userDeleteSlice } from "./userDelete/userDeleteSlice";
import { userListSlice } from "./userList/userListSlice";
import { userProfileSlice } from "./userProfile/profileSlice";
import { userUpdateProfileSlice } from "./userProfile/updateProfileSlice";
import { userUpdateAdminSlice } from "./userUpdateAdmin/userUpdateAdminSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    productDelete: productDeleteSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    productCreateReview: productCreateReviewSlice.reducer,
    productTopRated: productTopRatedSlice.reducer,
    cart: cartSlice.reducer,
    userAuth: userAuthSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userProfile: userProfileSlice.reducer,
    userUpdateProfile: userUpdateProfileSlice.reducer,
    userDelete: userDeleteSlice.reducer,
    userUpdate: userUpdateAdminSlice.reducer,
    userList: userListSlice.reducer,
    orderCreate: orderSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    orderPay: orderPaySlice.reducer,
    orderDelivered: orderDeliveredSlice.reducer,
    orderList: orderListSlice.reducer,
    orderListAdmin: orderListAdminSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
