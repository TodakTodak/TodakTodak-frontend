import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

function TextInputBox({
  isPassword = false,
  handleInputChange,
  placeholder = "",
  style,
  value
}) {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={isPassword}
        style={[ styles.textInput, style ]}
        value={value}
        onChangeText={handleInputChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 20
  },
  textInput: {
    width: "90%",
    height: 45,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10,
  }
});

export default TextInputBox;
