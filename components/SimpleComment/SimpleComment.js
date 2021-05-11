import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

import Button from "../Button/Button";

import love from "../../assets/pngs/love.png";
import { NANUM_REGULAR } from "../../constants/font";

function SimpleComment({
  postComment,
  handleCommentClick,
  handleLikeIconClick
}) {
  return (
    <TouchableOpacity
      key={postComment._id}
      style={styles.commentWrapper}
      onPress={() => handleCommentClick(postComment)}
    >
      <View style={styles.comment}>
        <Text style={styles.commentText}>
          {`달래꽃: ${postComment.user}`}
        </Text>
        <Text style={styles.commentText}>
          {`답변: ${
              9 < postComment.content.length ?
              `${postComment.content.substring(0, 8)}...` :
              postComment.content}`
            }
        </Text>
      </View>
      <Button
        image={love}
        textStyle={styles.commentText}
        buttonStyle={styles.commentLike}
        imageStyle={styles.commentImage}
        handleClick={() => handleLikeIconClick(postComment._id)}
        text={`${postComment.likes.length}쓰담`}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  commentWrapper: {
    width: "90%",
    height: 50,
    minHeight: 50,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 40
  },
  comment: {
    width: "40%",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  commentLike: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  commentImage: {
    width: 30,
    height: 30,
    marginRight: 5
  },
  commentText: {
    fontSize: 18,
    fontFamily: NANUM_REGULAR,
    color: "#000000"
  }
});

export default SimpleComment;
