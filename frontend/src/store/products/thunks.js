import {
  loadingProducts,
  getProductsSuccess,
  getProductsFailure,
} from "./productsSlice";
import axios from "axios";
import {
  getProductDetailFailure,
  getProductDetailSuccess,
  loadingDetailProducts,
} from "./productDetails";
import {
  productDeleteRequest,
  productDeleteSuccess,
} from "./productDeleteSlice";

export const startGettingProducts = () => {
  return async (dispatch) => {
    dispatch(loadingProducts());

    try {
      const { data } = await axios("http://127.0.0.1:8000/api/products/");
      dispatch(getProductsSuccess(data));
      // console.log(dispatch(getProductsSuccess(data)));
      // console.log(data);
    } catch (error) {
      dispatch(getProductsFailure(error.message));
      // console.log(error, "dadasd");
      // console.log(getProductsFailure(error));
      // console.log(error.message);
    }
  };
};

export const startGettingProductDetail = (id) => {
  return async (dispatch) => {
    dispatch(loadingDetailProducts());

    try {
      const { data } = await axios(`http://127.0.0.1:8000/api/products/${id}`);
      dispatch(getProductDetailSuccess(data));
    } catch (error) {
      dispatch(getProductDetailFailure(error.message));
    }
  };
};

export const startDeletingProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch(productDeleteRequest());
    try {
      const {
        userAuth: { userInfo },
      } = getState();
      //   console.log(userInfo.token);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `http://127.0.0.1:8000/api/products/delete/${id}/`,
        config
      );

      dispatch(productDeleteSuccess());
    } catch (error) {
      dispatch(
        getProductDetailFailure(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  };
};
