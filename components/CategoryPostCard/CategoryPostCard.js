import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";

function CategoryPostCard({
  likes,
  title,
  createdAt,
  cardStyle,
  handleClick,
  isAnonymous,
  ownerNickname
}) {
  return (
    <TouchableOpacity
      style={[ styles.postCard, cardStyle ]}
      onPress={handleClick}
    >
      <View style={styles.cardWrapper}>
        <View>
          <Text style={styles.postTitle}>
            {9 < title.length ? `${title.substring(0, 8)}...` : title}
          </Text>
          <View style={styles.postContentsWrapper}>
            <Text style={styles.postContent}>
              {isAnonymous ? "익명" : ownerNickname}
            </Text>
            <Text style={styles.postContent}>
              {createdAt.substring(0, 10)}
            </Text>
            <Text style={styles.postContent}>
              추천: {likes.length}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postCard: {
    width: "90%",
    minHeight: 70,
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
    alignItems: "flex-start",
  },
  postTitle: {
    minWidth: "40%",
    margin: 10,
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold"
  },
  postContentsWrapper: {
    flexDirection: "row"
  },
  postContent: {
    color: "#ffffff",
    margin: 10,
    marginRight: 10
  }
});

export default CategoryPostCard;
