import { putLogin } from "../api/userApi";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOGOUT
} from "../constants/actionTypes";

const successLogin = (userInfo) => ({
  type: LOGIN_SUCCESS,
  payload: userInfo
});

const failLogin = () => ({
  type: LOGIN_FAIL
});

export const logout = () => ({
  type: USER_LOGOUT
});

export const userLogin = (userInfo) => {
  return async (dispatch) => {
    try {
      const response = await putLogin(userInfo);
      const { loginInfo, errorMessage } = response;

      if (errorMessage) {
        return dispatch(failLogin(errorMessage));
      }

      dispatch(successLogin(loginInfo));
    } catch (err) {
      dispatch(failLogin("로그인에 실패했습니다."));
    }
  };
};
