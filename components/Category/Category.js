import React from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";

function Category({
  title,
  titleStyle,
  categoryColor = "rgba(255, 56, 56, 0.3)",
  categoryStyle,
  bottomBarStyle,
  categoryContainerStyle
}) {
  return (
    <View style={[styles.categoryContainer, categoryContainerStyle]}>
      <View
        style={[
          styles.categoryWrapper,
          { backgroundColor: categoryColor },
          categoryStyle
        ]}
      >
        <Text style={[ styles.categoryTitle, titleStyle ]}>
          {title}
        </Text>
      </View>
      <View style={[ styles.titleBottomBar, bottomBarStyle ]} />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    width: "50%",
    alignItems: "center"
  },
  categoryWrapper: {
    width: "50%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoryTitle: {
    color: "#ffffff"
  },
  titleBottomBar: {
    width: 100,
    height: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgb(255, 255, 255)"
  }
});

export default Category;
