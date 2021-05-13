import React from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";

function Category({
  title,
  titleStyle,
  categoryColor = "rgba(255, 56, 56, 0.8)",
  categoryStyle,
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
    color: "#ffffff",
    fontSize: 20
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
