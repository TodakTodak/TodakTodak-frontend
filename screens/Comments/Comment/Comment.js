import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

import Button from "../../../components/Button/Button";

import letterPage from "../../../assets/pngs/letterPage.png";

import { patchCommentLike } from "../../../api/commentApi";
import { addFriend } from "../../../api/userApi";

const Comment = ({
  comment,
  alertMessage
}) => {
  const [isLike, setIsLike] = useState(false);
  const { email, accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    if (comment.likes.includes(email)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, []);

  const handleLikeClick = async () => {
    try {
      const commentLikeInfo = {
        commentId: comment._id
      };
      const response = await patchCommentLike(
        accessToken,
        commentLikeInfo
      );

      if (response.errorMessage) {
        alertMessage(response.errorMessage);
      }

      setIsLike((isLike) => !isLike);
    } catch (err) {
      console.log(err.message);
      alertMessage("에러가 발생했습니다");
    }
  };

  const handleAddFriendClick = async () => {
    try {
      const friendInfo = {
        targetUser: comment.user
      };
      const response = await addFriend(
        friendInfo,
        accessToken
      );

      if (response.errorMessage) {
        alertMessage(response.errorMessage);
      } else {
        alertMessage("친구 요청을 했습니다!");
      }

    } catch (err) {
      alertMessage("에러가 발생했습니다");
    }
  };

  return (
    <View style={styles.commentsContainer}>
      <ImageBackground
        source={letterPage}
        style={styles.commentBackground}
      >
        <View style={styles.commentWrapper}>
          <View style={styles.commentUserInfo}>
            <View style={styles.userInfo}>
              <FontAwesome
                name="user-circle"
                size={20}
                color="black"
              />
              <Text style={styles.userNickname}>
                {comment.nickname}
              </Text>
            </View>
            <Text style={styles.commentContent}>
              {comment.content}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <View style={styles.addFriendWrapper}>
              <AntDesign
                size={15}
                color="red"
                name={isLike ? "heart" : "hearto"}
              />
              <Button
                text="좋아요"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                handleClick={handleLikeClick}
              />
            </View>
            <View style={styles.addFriendWrapper}>
              <AntDesign
                size={15}
                color="red"
                name="adduser"
              />
              <Button
                text="친추"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                handleClick={handleAddFriendClick}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Comment;
