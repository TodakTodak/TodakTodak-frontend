import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

function CategoryPostCard({
  title,
  comments,
  createdAt,
  cardStyle,
  textStyle,
  handleClick,
  isAnonymous,
  ownerNickname,
}) {
  return (
    <TouchableOpacity
      style={[ styles.postCard, cardStyle ]}
      onPress={handleClick}
    >
      <View style={styles.cardWrapper}>
        <View>
          <Text style={[ styles.postContent, textStyle ]}>
            달래미: {isAnonymous ? "익명" : ownerNickname}
          </Text>
          <Text style={[ styles.postContent, textStyle ]}>
            작성일: {createdAt.substring(0, 10)}
          </Text>
        </View>
        <View>
          <Text style={[ styles.postContent, textStyle ]}>
            제목: {title}
          </Text>
          <Text style={[ styles.postContent, textStyle ]}>
            답글 수: {comments.length}
          </Text>
        </View>
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
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  postContent: {
    margin: 10,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default CategoryPostCard;
