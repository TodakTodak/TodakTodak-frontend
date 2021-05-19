import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryPosts } from "../api/postApi";

import {
  LOVE,
  PAIN,
  COURSE,
  FRIEND,
  EMPLOYMENT
} from "../constants/category";

export const fetchEmploymentPosts = createAsyncThunk(
  "post/fetchEmploymentPosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);

export const fetchLovePosts = createAsyncThunk(
  "post/fetchLovePosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);

export const fetchCoursePosts = createAsyncThunk(
  "post/fetchCoursePosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);


export const fetchFriendPosts = createAsyncThunk(
  "post/fetchFriendPosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

      if (!response.errorMessage) {
        return response;
      }

      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      console.error(err.message);
    }
  }
);


export const fetchPainPosts = createAsyncThunk(
  "post/fetchPainPosts",
  async (categoryInfo, thunkAPI) => {
    try {
      const response = await getCategoryPosts(categoryInfo);

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
  message: null,
  isLoading: false,
  isFetched: {
    "취업": false,
    "사랑": false,
    "진로": false,
    "친구": false,
    "고통": false
  },
  post: {
    "취업": [],
    "사랑": [],
    "진로": [],
    "친구": [],
    "고통": []
  },
  bestPost: {
    "취업": null,
    "사랑": null,
    "진로": null,
    "친구": null,
    "고통": null
  }
};

export const categoryPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPostState: () => {
      return initialState;
    },
    clearMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: {
    [fetchEmploymentPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isFetched[EMPLOYMENT] = true;
      state.bestPost[EMPLOYMENT] = payload.highestLikesPost;
      state.post[EMPLOYMENT] = [...state.post[EMPLOYMENT], ...payload.categoryPosts];
    },
    [fetchEmploymentPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchEmploymentPosts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.errorMessage;
    },
    [fetchLovePosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isFetched[LOVE] = true;
      state.bestPost[LOVE] = payload.highestLikesPost;
      state.post[LOVE] = [...state.post[LOVE], ...payload.categoryPosts];
    },
    [fetchLovePosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLovePosts.rejected]: (state) => {
      state.isLoading = false;
      state.message = payload.errorMessage;
    },
    [fetchCoursePosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isFetched[COURSE] = true;
      state.bestPost[COURSE] = payload.highestLikesPost;
      state.post[COURSE] = [...state.post[COURSE], ...payload.categoryPosts];
    },
    [fetchCoursePosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCoursePosts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.errorMessage;
    },
    [fetchFriendPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isFetched[FRIEND] = true;
      state.bestPost[FRIEND] = payload.highestLikesPost;
      state.post[FRIEND] = [...state.post[FRIEND], ...payload.categoryPosts];
    },
    [fetchFriendPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchFriendPosts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.errorMessage;
    },
    [fetchPainPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isFetched[PAIN] = true;
      state.bestPost[PAIN] = payload.highestLikesPost;
      state.post[PAIN] = [...state.post[PAIN], ...payload.categoryPosts];
    },
    [fetchPainPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPainPosts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.errorMessage;
    }
  }
});
