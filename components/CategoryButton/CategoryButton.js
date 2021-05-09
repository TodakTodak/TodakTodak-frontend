import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

import { NANUM_REGULAR } from "../../constants/font";

function CategoryButton({
  title,
  titleStyle,
  focusValue,
  handleClick,
  categoryColor = "rgba(255, 56, 56, 0.3)",
  categoryStyle,
  bottomBarStyle,
  categoryContainerStyle
}) {
  return (
    <View style={[styles.categoryContainer, categoryContainerStyle]}>
      <TouchableOpacity
        onPress={() => handleClick(title)}
        accessibilityRole="button"
        style={[
          styles.categoryWrapper,
          { backgroundColor: categoryColor },
          categoryStyle
        ]}
      >
        <Text style={[ styles.categoryTitle, titleStyle ]}>
          {title}
        </Text>
      </TouchableOpacity>
      <View
        style={[
          styles.titleBottomBar,
          bottomBarStyle,
          { backgroundColor:
              focusValue === title ?
                "rgb(255, 255, 255)" :
                "rgba(255, 255, 255, 0.1)"
          }
        ]}
      />
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
    fontSize: 20,
    fontFamily: NANUM_REGULAR
  },
  titleBottomBar: {
    width: 100,
    height: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  }
});

export default CategoryButton;
