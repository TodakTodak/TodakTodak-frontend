import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  putLogin,
  getFriends,
  postSignup,
  getWaitingFriends,
  patchPendingFriend,
  rejectPendingFriend
} from "../api/userApi";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (userInfo, thunkAPI) => {
    try {
      const response = await putLogin(userInfo);

      if (!response.errorMessage) {
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

export const fetchGetWaitingFriends = createAsyncThunk(
  "user/fetchGetWaitingFriends",
  async (userInfo, thunkAPI) => {
    try {
      const response = await getWaitingFriends(userInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);

export const fetchPendingFriend = createAsyncThunk(
  "user/fetchPendingFriend",
  async (friendInfo, thunkAPI) => {
    try {
      const response = await patchPendingFriend(friendInfo);

      if (!response.message) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);

export const fetchRejectFriend = createAsyncThunk(
  "user/fetchRejectFriend",
  async (friendInfo, thunkAPI) => {
    try {
      const response = await rejectPendingFriend(friendInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);

export const fetchGetFriend = createAsyncThunk(
  "user/fetchGetFriend",
  async (friendInfo, thunkAPI) => {
    try {
      const response = await getFriends(friendInfo);

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
    },

    // [fetchGetWaitingFriends.fulfilled]: (state, { payload }) => {
    //   state.waitingFriendList = payload.friends;
    //   state.isLoading = false;
    // },
    // [fetchGetWaitingFriends.pending]: (state) => {
    //   state.isLoading = true
    // },
    // [fetchGetWaitingFriends.rejected]: (state, { payload }) => {
    //   state.message = payload.errorMessage;
    //   state.isLoading = false;
    // },

    // [fetchPendingFriend.fulfilled]: (state) => {
    //   state.isLoading = false;
    // },
    // [fetchPendingFriend.pending]: (state) => {
    //   state.isLoading = true
    // },
    // [fetchPendingFriend.rejected]: (state, { payload }) => {
    //   state.message = payload.errorMessage;
    //   state.isLoading = false;
    // },

    // [fetchRejectFriend.fulfilled]: (state, { payload }) => {},
    // [fetchRejectFriend.pending]: (state) => {
    //   state.isLoading = true
    // },
    // [fetchRejectFriend.rejected]: (state, { payload }) => {
    //   state.message = payload.errorMessage;
    // },

    // [fetchGetFriend.fulfilled]: (state, { payload }) => {},
    // [fetchGetFriend.pending]: (state) => {
    //   state.isLoading = true
    // },
    // [fetchGetFriend.rejected]: (state, { payload }) => {
    //   state.message = payload.errorMessage;
    // }
  }
});
