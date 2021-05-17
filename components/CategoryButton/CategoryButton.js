import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  WHITE,
  CATEGORY_ACTIVE_COLOR,
  OPACITY_BACKGROUND
} from "../../constants/color";

function CategoryButton({
  title,
  titleStyle,
  focusValue,
  handleClick,
  categoryContainerStyle,
  categoryColor = CATEGORY_ACTIVE_COLOR
}) {
  return (
    <View style={[styles.categoryContainer, categoryContainerStyle]}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={() => handleClick(title)}
        style={[
          styles.categoryWrapper,
          {
            backgroundColor:
              focusValue === title ?
                categoryColor :
                OPACITY_BACKGROUND
          }
        ]}
      >
        <Text style={[ styles.categoryTitle, titleStyle ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    width: "50%",
    alignItems: "center",
    marginBottom: 30
  },
  categoryWrapper: {
    width: "75%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10
  },
  categoryTitle: {
    color: WHITE,
    fontSize: 15
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
