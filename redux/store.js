import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import { userSlice } from "./userSlice";

const reducer = {
  user: userSlice.reducer
};

const middleware = [thunk, createLogger()];

const store = configureStore({
  reducer,
  middleware
});

export default store;
