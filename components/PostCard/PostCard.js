import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

function PostCard({
  cardStyle,
  textStyle,
  postTitle,
  handleClick,
  postCategory
}) {
  return (
    <TouchableOpacity
      style={[ styles.postCard, cardStyle ]}
      onPress={handleClick}
    >
      <View>
        <Text style={[ styles.postContent, textStyle ]}>
          고민 유형: {postCategory}
        </Text>
        <Text style={[ styles.postContent, textStyle ]}>
          고민 제목: {postTitle}
        </Text>
      </View>
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
  },
  postContent: {
    margin: 10,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default PostCard;
