import React from "react";
import {
  StyleSheet,
  View
} from "react-native";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";

function Intro() {
  return (
    <View>
      <Title text="토닥 토닥" titleStyle={styles.titleContainer} />
      <View style={styles.buttonContainer}>
        <Button text="로그인" />
        <Button text="회원가입" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 20
  }
});

export default Intro;
