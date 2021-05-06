import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";

import backgroundImage from "./assets/pngs/background.png";
import titleImage from "./assets/pngs/moon.png";

function Intro() {
  return (
    <View>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}
      >
        <View style={styles.title}>
          <Image
            style={styles.titleImage}
            source={titleImage}
          />
          <Text style={styles.titleText}>
            토닥 토닥
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              로그인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              회원 가입
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  title: {
    flex: 1,
    position: "relative",
    height: 100,
    marginTop: "50%"
  },
  titleText: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold"
  },
  titleImage: {
    width: 60,
    height: 60,
    position: "absolute",
    top: "-5%",
    left: "-7%"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginBottom: 20
  },
  button: {
    width: "45%",
    height: "auto",
    alignItems: "center",
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#8997DA",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold"
  }
});

export default Intro;
