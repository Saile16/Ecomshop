import axios from "axios";
import { userLoginSuccess } from "../auth/authSlice";
import { startLoginAuth } from "../auth/thunks";
import {
  userProfileFailure,
  userProfileRequest,
  userProfileSuccess,
} from "./profileSlice";
import {
  userUpdateProfileRequest,
  userUpdaterProfileFailure,
  userUpdaterProfileSuccess,
} from "./updateProfileSlice";

//Registrando Usuario
export const startGettingUserProfile = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userProfileRequest());

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
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/users/${id}/`,
        config
      );
      dispatch(userProfileSuccess(data));
    } catch (error) {
      dispatch(userProfileFailure(error.message));
    }
  };
};

export const startUpdatingUserProfile = (user) => {
  console.log(user);
  return async (dispatch, getState) => {
    try {
      dispatch(userUpdateProfileRequest());

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
      const { data } = await axios.put(
        `http://127.0.0.1:8000/api/users/profile/update/`,
        user,
        config
      );
      dispatch(userUpdaterProfileSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(userLoginSuccess(data));
    } catch (error) {
      dispatch(userUpdaterProfileFailure(error.message));
    }
  };
};
