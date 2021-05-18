import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";

import { RED } from "../../constants/color";

function CategoryPostCard({
  postInfo,
  cardStyle,
  titleStyle,
  handleClick
}) {
  const {
    likes,
    title,
    createdAt,
    isAnonymous,
    ownerNickname,
  } = postInfo;

  return (
    <TouchableOpacity
      style={[ styles.postCard, cardStyle ]}
      onPress={handleClick}
    >
      <View style={styles.cardWrapper}>
        <View>
          <Text style={[styles.postTitle, titleStyle]}>
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
            color={RED}
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

export default CategoryPostCard;
