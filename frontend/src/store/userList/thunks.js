import axios from "axios";
import {
  userListFail,
  userListRequest,
  userListSuccess,
} from "./userListSlice";

export const startGettingListUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(userListRequest());

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
        `http://127.0.0.1:8000/api/users/`,
        config
      );
      dispatch(userListSuccess(data));
    } catch (error) {
      dispatch(
        userListFail(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        )
      );
    }
  };
};
