import React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

function Button({
  text,
  textStyle,
  buttonStyle,
  handleClick
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

export default Button;
