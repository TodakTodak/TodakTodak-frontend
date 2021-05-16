import React from "react";
import {
  TouchableOpacity,
  StyleSheet
} from "react-native";

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
    backgroundColor: "rgba(255, 255, 255, 0.3)"
  }
});

export default PostCard;
