import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

function TextInputBox({
  isPassword = false,
  handleInputChange,
  placeholder = "",
  isMultiline = false,
  editable = true,
  style,
  value,
  type
}) {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        editable={editable}
        multiline={isMultiline}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        style={[ styles.textInput, style ]}
        value={value}
        onChangeText={handleInputChange}
        textContentType={type}
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
    borderRadius: 20,
    padding: 10
  }
});

export default TextInputBox;
