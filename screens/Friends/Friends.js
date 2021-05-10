import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground
} from "react-native";

import Title from "../../components/Title/Title";

import backgroundImage from "../../assets/pngs/background.png";

function Friends() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title text="나의 인연들" imageStyle={styles.titleImage} />
        <Text>스토리지 페이지</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "100%"
  }
});

export default Friends;
