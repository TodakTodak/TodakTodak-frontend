import React from "react";
import {
  View,
  TextInput,
  StyleSheet
} from "react-native";

function TextInputBox({
  type,
  style,
  value,
  editable = true,
  placeholder = "",
  handleInputChange,
  isPassword = false,
  isMultiline = false
}) {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        value={value}
        editable={editable}
        textContentType={type}
        multiline={isMultiline}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        onChangeText={handleInputChange}
        style={[ styles.textInput, style ]}
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
    paddingLeft: 10,
    fontSize: 18
  }
});

export default TextInputBox;
