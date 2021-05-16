import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { putLogin, postSignup } from "../api/userApi";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (userInfo, thunkAPI) => {
    try {
      const response = await putLogin(userInfo);

      if (!response.errorMessage) {
        const userLoginInfo = {
          email: userInfo.email,
          password: userInfo.password
        };

        await SecureStore.setItemAsync("userInfo", JSON.stringify(userLoginInfo));

        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "user/fetchSignup",
  async (userInfo, thunkAPI) => {
    try {
      const response = await postSignup(userInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);

const initialState = {
  email: "",
  nickname: "",
  accessToken: "",
  message: "",
  isLoading: false,
  waitingFriendList: [],
  friendList: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => {
      return initialState;
    }
  },
  extraReducers: {
    [fetchLogin.fulfilled]: (state, { payload }) => {
      const { loginInfo, token } = payload;

      state.email = loginInfo.email;
      state.nickname = loginInfo.nickname;
      state.accessToken = token;
      state.isLoading = false;
    },
    [fetchLogin.pending]: (state) => {
      state.isLoading = true
    },
    [fetchLogin.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    },

    [fetchSignup.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [fetchSignup.pending]: (state) => {
      state.isLoading = true
    },
    [fetchSignup.rejected]: (state, { payload }) => {
      state.message = payload.errorMessage;
      state.isLoading = false;
    }
  }
});
