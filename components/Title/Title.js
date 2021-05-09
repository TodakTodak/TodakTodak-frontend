import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View
} from "react-native";

import { NANUM_REGULAR } from "../../constants/font";
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
    height: 50,
    marginTop: "30%"
  },
  titleText: {
    color: "#ffffff",
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: NANUM_REGULAR
  },
  titleImage: {
    width: 60,
    height: 60,
    position: "absolute",
    top: "-65%",
    left: "25%"
  },
});

export default Title;
