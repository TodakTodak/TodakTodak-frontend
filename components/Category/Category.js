import React from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";

function Category({
  title,
  titleStyle,
  categoryStyle,
  bottomBarStyle
}) {
  return (
    <>
      <View style={[ styles.categoryWrapper, categoryStyle ]}>
        <Text style={[ styles.categoryTitle, titleStyle ]}>
          {title}
        </Text>
      </View>
      <View style={[ styles.titleBottomBar, bottomBarStyle ]} />
    </>
  );
}

const styles = StyleSheet.create({
  categoryWrapper: {
    width: "25%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255, 56, 56, 0.3)"
  },
  categoryTitle: {
    color: "#ffffff"
  },
  titleBottomBar: {
    width: "25%",
    height: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgb(255, 255, 255)"
  }
});

export default Category;
