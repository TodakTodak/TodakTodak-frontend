import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import {
  WHITE,
  CATEGORY_DEFAULT_BACKGROUND
} from "../../constants/color";

function Category({
  title,
  titleStyle,
  categoryStyle,
  categoryContainerStyle,
  categoryColor = CATEGORY_DEFAULT_BACKGROUND
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
    color: WHITE,
    fontSize: 20
  }
});

export default Category;
