import React from "react";
import { TouchableOpacity } from "react-native";

import styles from "./styles";

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

export default PostCard;
