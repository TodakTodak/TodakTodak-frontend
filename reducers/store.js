import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./index";

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(
    ...middlewares,
    createLogger()
  )
);

export default store;
