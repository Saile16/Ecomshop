import axios from "axios";
import { cartClearItems } from "../cart/cartSlice";
import {
  orderDetailsFail,
  orderDetailsRequest,
  orderDetailsSuccess,
} from "./orderDetails";
import { orderListFail, orderListRequest, orderListSuccess } from "./orderList";
import { orderPayFail, orderPayRequest, orderPaySuccess } from "./orderPay";
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

export const startGettingOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderDetailsRequest());
      const {
        userAuth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/orders/${id}/`,
        config
      );
      dispatch(orderDetailsSuccess(data));
    } catch (error) {
      dispatch(
        orderDetailsFail(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  };
};

export const startPayingOrder = (id, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderPayRequest());
      const {
        userAuth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `http://127.0.0.1:8000/api/orders/${id}/pay/`,
        paymentResult,
        config
      );
      dispatch(orderPaySuccess(data));
    } catch (error) {
      dispatch(
        orderPayFail(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  };
};

export const startGettingOrderList = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderListRequest());
      const {
        userAuth: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/orders/myorders/`,
        config
      );
      dispatch(orderListSuccess(data));
    } catch (error) {
      dispatch(
        orderListFail(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  };
};
