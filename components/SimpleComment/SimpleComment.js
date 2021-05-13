import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import Button from "../Button/Button";

import { NANUM_REGULAR } from "../../constants/font";

function SimpleComment({
  postComment,
  handleCommentClick,
  handleLikeIconClick
}) {
  const user = useSelector((state) => state.userReducer);

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
        <Text style={styles.commentText}>
          {`내용: ${
              9 < postComment.content.length ?
              `${postComment.content.substring(0, 8)}...` :
              postComment.content}`
            }
        </Text>
      </View>
      <View style={styles.goodButtonContainer}>
        <Entypo
          size={25}
          color="red"
          name={postComment.likes.includes(user.email) ? "heart" : "heart-outlined"}
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 40
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
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  commentText: {
    fontSize: 20,
    fontFamily: NANUM_REGULAR,
    color: "#000000"
  }
});

export default SimpleComment;
