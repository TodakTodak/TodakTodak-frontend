import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

import { NANUM_REGULAR } from "../../constants/font";

function CategoryPostCard({
  likes,
  title,
  createdAt,
  cardStyle,
  textStyle,
  handleClick,
  isAnonymous,
  ownerNickname,
  isComment = false
}) {
  return (
    <TouchableOpacity
      style={[ styles.postCard, cardStyle ]}
      onPress={handleClick}
    >
      <View style={styles.cardWrapper}>
        <View>
          <Text style={[ styles.postContent, textStyle ]}>
            작성자: {isAnonymous ? "익명" : ownerNickname}
          </Text>
          <Text style={[ styles.postContent, textStyle ]}>
            작성일: {createdAt.substring(0, 10)}
          </Text>
        </View>
        <View>
          <Text style={[ styles.postContent, textStyle ]}>
            제목: {9 < title.length ? `${title.substring(0, 8)}...` : title}
          </Text>
          <Text style={[ styles.postContent, textStyle ]}>
            {isComment ? "쓰담" : "토닥"}: {likes.length}
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
    justifyContent: "space-around"
  },
  postContent: {
    minWidth: "40%",
    margin: 10,
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: NANUM_REGULAR
  }
});

export default CategoryPostCard;
