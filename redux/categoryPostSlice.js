import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryPosts } from "../api/postApi";

export const fetchEmploymentPosts = createAsyncThunk(
  "post/fetchEmploymentPosts",
  async (categoryInfo, thunkAPI) => {
    const { category, page } = categoryInfo;
    try {
      const response = await getCategoryPosts(category, page);

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
    const { category, page } = categoryInfo;
    try {
      const response = await getCategoryPosts(category, page);

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
    const { category, page } = categoryInfo;
    try {
      const response = await getCategoryPosts(category, page);

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
    const { category, page } = categoryInfo;
    try {
      const response = await getCategoryPosts(category, page);

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
    const { category, page } = categoryInfo;
    try {
      const response = await getCategoryPosts(category, page);

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
  message: "",
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
    }
  },
  extraReducers: {
    [fetchEmploymentPosts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isFetched["취업"] = true;
      state.bestPost["취업"] = payload.highestLikesPost;
      state.post["취업"] = [...state.post["취업"], ...payload.categoryPosts];
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
      state.isFetched["사랑"] = true;
      state.bestPost["사랑"] = payload.highestLikesPost;
      state.post["사랑"] = [...state.post["사랑"], ...payload.categoryPosts];
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
      state.isFetched["진로"] = true;
      state.bestPost["진로"] = payload.highestLikesPost;
      state.post["진로"] = [...state.post["진로"], ...payload.categoryPosts];
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
      state.isFetched["친구"] = true;
      state.bestPost["친구"] = payload.highestLikesPost;
      state.post["친구"] = [...state.post["친구"], ...payload.categoryPosts];
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
      state.isFetched["고통"] = true;
      state.bestPost["고통"] = payload.highestLikesPost;
      state.post["고통"] = [...state.post["고통"], ...payload.categoryPosts];
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
