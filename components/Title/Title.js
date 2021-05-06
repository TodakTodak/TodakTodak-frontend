import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View
} from "react-native";

import titleImage from "../../assets/pngs/moon.png";

function Title({
  titleStyle,
  imageStyle,
  textStyle,
  text
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
    height: 100,
    marginTop: "50%"
  },
  titleText: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold"
  },
  titleImage: {
    width: 60,
    height: 60,
    position: "absolute",
    top: "-5%",
    left: "25%"
  },
});

export default Title;
