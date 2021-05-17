import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  WHITE,
  BUTTON_BACKGROUND
} from "../../constants/color";

function Button({
  handleClick,
  buttonStyle,
  textStyle,
  text
}) {
  return (
    <TouchableOpacity
      style={[ styles.button, buttonStyle ]}
      onPress={handleClick}
    >
      <View style={styles.buttonContents}>
        <Text style={[ styles.buttonText, textStyle ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "45%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: BUTTON_BACKGROUND
  },
  buttonContents: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 20
  },
  buttonText: {
    color: WHITE,
    fontWeight: "bold",
    fontSize: 20
  }
});

export default Button;
