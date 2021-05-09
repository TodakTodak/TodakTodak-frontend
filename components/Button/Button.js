import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from "react-native";

import { NANUM_REGULAR } from "../../constants/font";

function Button({
  handleClick,
  buttonStyle,
  textStyle,
  image,
  text
}) {
  return (
    <TouchableOpacity
      style={[ styles.button, buttonStyle ]}
      onPress={handleClick}
    >
      <View style={styles.buttonContents}>
        { image && <Image style={styles.image} source={image} /> }
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
    backgroundColor: "#8997DA"
  },
  buttonContents: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 5
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: NANUM_REGULAR
  }
});

export default Button;
