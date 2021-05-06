import React from "react";
import {
  StyleSheet,
  ImageBackground
} from "react-native";

import backgroundImage from "./assets/pngs/background.png";

import Login from "./screens/Login/Login";
import Intro from "./screens/Intro/Intro";
import Signup from "./screens/Signup/Signup";

function App() {
  return (
    <ImageBackground
    source={backgroundImage}
    style={styles.backgroundContainer}
    >
      <Signup />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  }
});

export default App;
