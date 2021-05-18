import React from "react";
import { TouchableOpacity } from "react-native";

import styles from "./styles";

function PostCard({
  children,
  handleClick
}) {
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={styles.postCard}
    >
      {children}
    </TouchableOpacity>
  );
}

export default PostCard;
