/**
 * Component for Showing Text input box of the user.
 * When typing keyboard, write value in Text input box.
 *
 * @param {String} type Typeof TextInput
 * @param {String} value The value in text input box
 * @param {String} placeholder Default value in text input box
 * @param {Boolean} editable Set Edit Permissions default value is true
 * @param {Boolean} isPassword If this prop is true
 * you cant see the value in input box.
 * Default value is false
 * @param {Boolean} isMultiline The multi line option default value is false
 * @param {Function} handleInputChange When typing, change input value function
 */

import React from "react";
import { View, TextInput } from "react-native";

import styles from "./styles";

const TextInputWrapper = ({
  type,
  style,
  value,
  editable = true,
  placeholder = "",
  handleInputChange,
  isPassword = false,
  isMultiline = false
}) => {
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

export default React.memo(TextInputWrapper);
