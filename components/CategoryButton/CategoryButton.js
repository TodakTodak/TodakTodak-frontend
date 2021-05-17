import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

import {
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

export default CategoryButton;
