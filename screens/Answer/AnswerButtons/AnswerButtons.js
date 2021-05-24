import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import Button from "../../../components/Button/Button";

import styles from "./styles";

import { RED } from "../../../constants/color";

const AnswerButtons = ({
  user,
  postId,
  commentInfo,
  isCommentLike,
  handleAddFriendClick,
  handleCommentLikeClick,
  handleModifyButtonClick,
  handleRoutePostButtonClick
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={handleCommentLikeClick}
        underlayColor="rgba(255, 255, 255, 0.6)"
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AntDesign
            style={{ padding: 10 }}
            size={25}
            color={RED}
            name={isCommentLike ? "heart" : "hearto"}
          />
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>쓰담쓰담</Text>
        </View>
      </TouchableHighlight>
      {postId &&
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={handleRoutePostButtonClick}
          underlayColor="rgba(255, 255, 255, 0.6)"
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <AntDesign
              style={{ padding: 10 }}
              size={25}
              color={RED}
              name="inbox"
            />
            <Text style={{ fontWeight: "bold", fontSize: 10 }}>게시물로</Text>
          </View>
        </TouchableHighlight>
      }
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={handleModifyButtonClick}
          underlayColor="rgba(255, 255, 255, 0.6)"
        >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Ionicons
            style={{ padding: 10 }}
            size={25}
            color={RED}
            name="document"
          />
            <Text style={{ fontWeight: "bold", fontSize: 10 }}>수정하기</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default AnswerButtons;
