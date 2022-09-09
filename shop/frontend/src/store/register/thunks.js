import axios from "axios";
import { startLoginAuth } from "../auth/thunks";

import {
  userRegisterFailure,
  userRegisterRequest,
  userRegisterSuccess,
} from "./registerSlice";

//Registrando Usuario
export const startRegisterUser = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userRegisterRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //enviamos una peticion de axios para obteer los datos del user y ver si existe
      //o/y si se puede logear
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        {
          name: name,
          email: email,
          password: password,
        },
        config
      );
      console.log(data);
      dispatch(userRegisterSuccess(data));
      dispatch(startLoginAuth(email, password));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      //   dispatch(userRegisterFailure(error.response.data.detail));
      console.log(error);
    }
  };
};
