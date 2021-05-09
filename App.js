import React from "react";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  NanumBrushScript_400Regular
} from "@expo-google-fonts/nanum-brush-script";

import MainStackNavigation from "./navigations/MainStackNavigation/MainStackNavigation";

import store from "./reducers/store";

function App() {
  let [fontsLoaded] = useFonts({
    NanumBrushScript_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <MainStackNavigation />
    </Provider>
  );
}

export default App;
