import axios from "axios";
import { cartClearItems } from "../cart/cartSlice";
import {
  orderCreateFail,
  orderCreateRequest,
  orderCreateSuccess,
} from "./orderSlice";
export const startCreatingOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderCreateRequest());

      //pedimos el usuario que esta logeado para obtener su token
      const {
        userAuth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/orders/add/`,
        order,
        config
      );
      dispatch(orderCreateSuccess(data));
      dispatch(cartClearItems());
      localStorage.removeItem("cartItems");
    } catch (error) {
      dispatch(orderCreateFail(error.response));
    }
  };
};
