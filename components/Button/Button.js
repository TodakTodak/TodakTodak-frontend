/**
 * Component for button with icon of the user.
 *
 * @component
 *
 * @param {String} text A content of button
 * @param {Function} handleClick Function to be executed when the button is clicked
 */

import React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

const Button = ({
  text,
  children,
  textStyle,
  buttonStyle,
  handleClick
}) => {
  return (
    <TouchableOpacity
      style={[ styles.button, buttonStyle ]}
      onPress={handleClick}
    >
      <View style={styles.buttonContents}>
        {children}
        <Text style={[ styles.buttonText, textStyle ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Button);
