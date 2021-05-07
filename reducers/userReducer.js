import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOGOUT
} from "../constants/actionTypes";

const initialState = {
  email: "",
  nickname: "",
  message: ""
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { email, nickname } = action.payload;

      return {
        ...state,
        email,
        nickname
      };
    }

    case LOGIN_FAIL: {
      return {
        ...state,
        message: action.payload
      };
    }

    case USER_LOGOUT: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
}

export default userReducer;
