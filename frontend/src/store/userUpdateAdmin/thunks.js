import axios from "axios";
import { startGettingUserProfile } from "../userProfile/thunks";
import {
  userUpdateAdminFail,
  userUpdateAdminRequest,
  userUpdateAdminSuccess,
} from "./userUpdateAdminSlice";

export const startUpdatingUserAsAdmin = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userUpdateAdminRequest());
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
        `http://127.0.0.1:8000/api/users/update/${user._id}/`,
        user,
        config
      );
      dispatch(userUpdateAdminSuccess());

      //solo necesitamos el id para mostar el usauario por tanto lo pasamos asi
      dispatch(startGettingUserProfile(data.id));
    } catch (error) {
      dispatch(
        userUpdateAdminFail(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  };
};
