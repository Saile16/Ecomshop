import axios from "axios";
import {
  userDeleteFail,
  userDeleteRequest,
  userDeleteSuccess,
} from "./userDeleteSlice";

export const startDeletingUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userDeleteRequest());
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
        `http://127.0.0.1:8000/api/users/delete/${id}/`,
        config
      );
      dispatch(userDeleteSuccess(data));
    } catch (error) {
      dispatch(
        userDeleteFail(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  };
};
