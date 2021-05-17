import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet
} from "react-native";

import titleImage from "../../assets/pngs/moon.png";

function Title({
  text,
  textStyle,
  titleStyle,
  imageStyle
}) {
  return (
    <View style={[ styles.title, titleStyle ]}>
      <Image
        style={[ styles.titleImage, imageStyle ]}
        source={titleImage}
      />
      <Text style={[ styles.titleText, textStyle ]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    position: "relative",
    alignItems: "center",
    height: 55,
    marginTop: "30%"
  },
  titleText: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold"
  },
  titleImage: {
    width: 50,
    height: 50,
    position: "absolute",
    top: "-45%",
    left: "20%"
  },
});

export default Title;
