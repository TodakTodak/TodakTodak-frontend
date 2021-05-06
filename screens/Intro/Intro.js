import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View
} from "react-native";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";

import backgroundImage from "../../assets/pngs/background.png";

function Intro() {
  return (
    <View>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}
      >
        <Title text="토닥 토닥" />
        <View style={styles.buttonContainer}>
          <Button text="로그인" />
          <Button text="회원가입" />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 20
  }
});

export default Intro;
