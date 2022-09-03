import axios from "axios";
import {
  userLoginFailure,
  userLoginRequest,
  userLoginSuccess,
  userLogout,
} from "./authSlice";

export const startLoginAuth = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userLoginRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //enviamos una peticion de axios para obteer los datos del user y ver si existe
      //o/y si se puede logear
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        {
          username: email,
          password: password,
        },
        config
      );

      dispatch(userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(userLoginFailure(error.response.data.detail));
    }
  };
};

export const startLogoutAuth = () => {
  localStorage.removeItem("userInfo");
  return async (dispatch) => {
    dispatch(userLogout());
  };
};
