import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";

import Button from "../Button/Button";

function SimpleComment({
  postComment,
  handleCommentClick,
  handleLikeIconClick
}) {
  const user = useSelector((state) => state.user);

  return (
    <TouchableOpacity
      key={postComment._id}
      style={styles.commentWrapper}
      onPress={() => handleCommentClick(postComment)}
    >
      <View style={styles.comment}>
        <Text style={styles.commentText}>
          {`답변자: ${postComment.user}`}
        </Text>
      </View>
      <View style={styles.goodButtonContainer}>
        <AntDesign
          size={25}
          color="red"
          name={postComment.likes.includes(user.email) ? "like1" : "like2"}
        />
        <Button
          textStyle={styles.commentText}
          buttonStyle={styles.commentLike}
          imageStyle={styles.commentImage}
          handleClick={() => handleLikeIconClick(postComment._id)}
          text={`댓글 추천: ${postComment.likes.length}`}
        />
      </View>
    </TouchableOpacity>
  );
}

export default SimpleComment;
