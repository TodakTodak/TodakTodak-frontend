import React from "react";
import {
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {
  BLACK,
  POST_CARD_BACKGROUND
} from "../../constants/color";

function PostCard({
  children,
  handleClick,
}) {
  return (
    <TouchableOpacity
      style={styles.postCard}
      onPress={handleClick}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postCard: {
    width: "90%",
    justifyContent: "center",
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    marginTop: 40,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: POST_CARD_BACKGROUND,
    shadowColor: BLACK,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.4,
    shadowRadius: 4
  },
});

export default PostCard;
