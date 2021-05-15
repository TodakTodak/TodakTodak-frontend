import React from "react";
import { Provider } from "react-redux";

import MainStackNavigation from "./navigations/MainStackNavigation/MainStackNavigation";

import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <MainStackNavigation />
    </Provider>
  );
}

export default App;
