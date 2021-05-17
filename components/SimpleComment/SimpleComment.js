import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Button from "../Button/Button";

import {
  TRANSPARENCY,
  COMMENT_BACKGROUND
} from "../../constants/color";

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

const styles = StyleSheet.create({
  commentWrapper: {
    width: "90%",
    height: 50,
    minHeight: 50,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COMMENT_BACKGROUND,
    borderRadius: 10
  },
  comment: {
    width: "40%",
    justifyContent: "space-evenly",
    paddingLeft: 30
  },
  goodButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  commentLike: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: TRANSPARENCY
  },
  commentText: {
    fontSize: 15,
    color: "#000000"
  }
});

export default SimpleComment;
