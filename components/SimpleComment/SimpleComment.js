import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text
} from "react-native";

import love from "../../assets/pngs/love.png";

function SimpleComment({ postComment }) {
  console.log(postComment)
  return (
    <TouchableOpacity
      key={postComment._id}
      style={styles.commentWrapper}
    >
      <View style={styles.comment}>
        <Text>{`달래꽃: ${postComment.user}`}</Text>
        <Text>
          {`답변: ${
              9 < postComment.content.length ?
              `${postComment.content.substring(0, 8)}...` :
              postComment.content}`
            }
        </Text>
      </View>
      <View style={styles.commentLike}>
        <Image style={styles.commentImage} source={love} />
        <Text>{`${postComment.likes.length}쓰담`}</Text>
      </View>
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
    alignItems: "center"
  },
  commentImage: {
    width: 30,
    height: 30,
    marginRight: 5
  }
});

export default SimpleComment;
