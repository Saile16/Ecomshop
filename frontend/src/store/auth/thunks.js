import axios from "axios";
import {
  userLoginFailure,
  userLoginRequest,
  userLoginSuccess,
} from "./authSlice";

export const startLoginAuth = (email, password) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //enviamos una peticion de axios para obteer los datos del user y ver si existe
      //o/y si se puede logear
      const { data } = await axios.post(
        "/api/users/login/",
        {
          username: email,
          password: password,
        },
        config
      );
      dispatch(userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(JSON.stringify(data)));
    } catch (error) {
      dispatch(userLoginFailure(error.message));
    }
  };
};
