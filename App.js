import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground
} from "react-native";

import backgroundImage from "./assets/pngs/background.png";

function App() {
  return (
    <ImageBackground
    source={backgroundImage}
    style={styles.backgroundContainer}
  >
    <View>
      <Text>안녕</Text>
    </View>
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
