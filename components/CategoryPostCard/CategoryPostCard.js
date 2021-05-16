import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
          </View>
        </View>
        <View style={styles.likeWrapper}>
          <AntDesign
            style={styles.likeIcon}
            size={15}
            color="red"
            name="heart"
          />
          <Text style={styles.postContent}>
            {likes.length}
          </Text>
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
    backgroundColor: "#fcd0a1",
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.4,
    shadowRadius: 4
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  postTitle: {
    minWidth: "40%",
    margin: 10,
    color: "#9e0031",
    fontSize: 17,
    fontWeight: "bold"
  },
  postContentsWrapper: {
    flexDirection: "row"
  },
  postContent: {
    margin: 10,
    marginRight: 10,
    color: "#000000",
    fontWeight: "600"
  },
  likeWrapper: {
    flexDirection: "row"
  },
  likeIcon: {
    paddingTop: 11
  }
});

export default CategoryPostCard;
