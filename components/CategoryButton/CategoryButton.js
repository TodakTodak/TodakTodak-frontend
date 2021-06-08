/**
 * Component for showing a category to the user.
 * When pressed, executes something handleClick function.
 *
 * @component
 *
 * @param {String} title Category name
 * @param {String} focusValue Active category name
 * @param {String} categoryColor Category Button background color
 * @param {Object} categoryInfo Category information for handle click function
 * @param {Function} handleClick When pressed, executes something
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

import {
  OPACITY_BACKGROUND,
  CATEGORY_ACTIVE_COLOR
} from "../../constants/color";
import { TEST_ID } from "../../constants/testContents";

const CategoryButton = ({
  title,
  titleStyle,
  focusValue,
  handleClick,
  categoryInfo,
  categoryContainerStyle,
  categoryColor = CATEGORY_ACTIVE_COLOR
}) => {
  return (
    <View style={[ styles.categoryContainer, categoryContainerStyle ]}>
      <TouchableOpacity
        testID={TEST_ID}
        accessibilityRole="button"
        onPress={() => handleClick(title, categoryInfo)}
        style={[
          styles.categoryWrapper,
          {
            backgroundColor:
              focusValue === title
                ? categoryColor
                : OPACITY_BACKGROUND
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

export default React.memo(CategoryButton);
