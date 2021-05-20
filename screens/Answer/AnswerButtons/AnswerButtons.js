import React from "react";
import { View } from "react-native";
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
      <View style={styles.buttonContainer}>
        {commentInfo.user === user.email
          ? <>
              <Ionicons
                size={25}
                color={RED}
                name="document"
              />
              <Button
                text="수정 하기"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                handleClick={handleModifyButtonClick}
              />
            </>
          : <>
              <AntDesign
                size={25}
                color={RED}
                name="adduser"
              />
              <Button
                text="친구추가"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                handleClick={handleAddFriendClick}
              />
            </>
        }
      </View>
      <View style={styles.buttonContainer}>
        <AntDesign
          size={25}
          color={RED}
          name={isCommentLike ? "like1" : "like2"}
        />
        <Button
          text="쓰담쓰담"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          handleClick={handleCommentLikeClick}
        />
      </View>
      {postId &&
        <View style={styles.buttonContainer}>
          <AntDesign
            size={25}
            color={RED}
            name="inbox"
          />
          <Button
            text="게시물로"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            handleClick={handleRoutePostButtonClick}
          />
        </View>
      }
    </View>
  );
};

export default AnswerButtons;
