import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View
} from "react-native";

function Button({
  buttonStyle,
  textStyle,
  image,
  text
}) {
  return (
    <TouchableOpacity style={[ styles.button, buttonStyle ]}>
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
    padding: 20,
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
    fontWeight: "bold"
  }
});

export default Button;
