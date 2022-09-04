import axios from "axios";
import {
  userProfileFailure,
  userProfileRequest,
  userProfileSuccess,
} from "./profileSlice";

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
