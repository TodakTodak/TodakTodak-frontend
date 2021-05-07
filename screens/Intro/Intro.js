import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground
} from "react-native";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";

import backgroundImage from "../../assets/pngs/background.png";

function Intro({ navigation }) {
  const handleLoginClick = () => {
    navigation.navigate("Login");
  };

  const handleSignupClick = () => {
    navigation.navigate("Signup");
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View>
        <Title text="토닥 토닥"
          titleStyle={styles.titleContainer}
          imageStyle={styles.titleImage}
        />
        <View style={styles.buttonContainer}>
          <Button text="로그인" handleClick={handleLoginClick} />
          <Button text="회원가입" handleClick={handleSignupClick} />
        </View>
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
  titleContainer: {
    flex: 1
  },
  titleImage: {
    top: "-5%"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 20
  }
});

export default Intro;
