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
  handleAddCommentButtonClick,
  handleViewCommentsButtonClick
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button
        text="위로 하기"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
        handleClick={handleLikeButtonClick}
      >
        <AntDesign
          style={styles.buttonIcon}
          size={25}
          color={RED}
          name={isPostLike ? "heart" : "hearto"}
        />
      </Button>
      <Button
        text="댓글 달기"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
        handleClick={handleAddCommentButtonClick}
      >
        <FontAwesome
          style={styles.buttonIcon}
          size={25}
          color={RED}
          name="comment-o"
        />
      </Button>
      <Button
        text="댓글 보기"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
        handleClick={handleViewCommentsButtonClick}
      >
        <FontAwesome
          style={styles.buttonIcon}
          size={25}
          color={RED}
          name="comments"
        />
      </Button>
      {postInfo.owner === user.email &&
        <Button
          text="수정 하기"
          textStyle={styles.buttonText}
          buttonStyle={styles.buttonContainer}
          handleClick={handleModifyButtonClick}
        >
          <Ionicons
            style={styles.buttonIcon}
            size={25}
            color={RED}
            name="document"
          />
        </Button>
      }
    </View>
  );
};

export default DetailPostButtons;
