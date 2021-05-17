import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

function CategoryButton({
  title,
  titleStyle,
  focusValue,
  handleClick,
  categoryContainerStyle,
  categoryColor = "rgba(255, 56, 56, 0.3)"
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
                "rgba(255, 255, 255, 0.3)"
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
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)"
  },
  categoryTitle: {
    color: "#ffffff",
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
