import React from "react";
import { View } from "react-native";
import {
  Ionicons,
  AntDesign,
  FontAwesome
} from "@expo/vector-icons";

import Button from "../../../components/Button/Button";

import styles from "./styles";
import { RED } from "../../../constants/color";

const DetailPostButtons = ({
  user,
  postInfo,
  isPostLike,
  handleLikeButtonClick,
  handleModifyButtonClick,
  handleAddCommentButtonClick
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <View style={styles.buttonContainer}>
        <AntDesign
          size={25}
          color={RED}
          name={isPostLike ? "like1" : "like2"}
        />
        <Button
          text="위로하기"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          handleClick={handleLikeButtonClick}
        />
      </View>
      <View style={styles.buttonContainer}>
        <FontAwesome
          size={25}
          color={RED}
          name="comment-o"
        />
        <Button
          text="댓글 달기"
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          handleClick={handleAddCommentButtonClick}
        />
      </View>
      {postInfo.owner === user.email &&
        <View style={styles.buttonContainer}>
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
        </View>
      }
    </View>
  );
};

export default DetailPostButtons;
