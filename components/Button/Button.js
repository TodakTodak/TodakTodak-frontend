import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

function Button({ buttonStyle, textStyle, text }) {
  return (
    <TouchableOpacity style={[ styles.button, buttonStyle ]}>
      <Text style={[ styles.buttonText, textStyle ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "45%",
    height: "auto",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#8997DA"
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold"
  }
});

export default Button;
