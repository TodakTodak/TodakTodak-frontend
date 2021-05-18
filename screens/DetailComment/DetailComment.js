import React, { useState } from "react";
import {
  View,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

import { RED } from "../../constants/color";

import { patchComment } from "../../api/postApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

const DetailComment = ({ route }) => {
  const [content, setContent] = useState("");

  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const { postId } = route.params;

  const handleAddCommentButtonClick = async () => {
    const commentInfo = {
      user,
      postId,
      content: content.trim()
    };

    try {
      const response = await patchComment(commentInfo);

      if (response.errorMessage) {
        console.log("에러 발생");
        return;
      }

      navigation.goBack();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}
      >
        <Title
          text="댓글 작성"
          textStyle={styles.titleText}
          imageStyle={styles.titleImage}
        />
        <View style={styles.postContentsWrapper}>
          <ImageBackground
            source={letterPage}
            style={styles.letterPage}
          >
            <View style={styles.categoryWrapper}>
              <TextInput
                value={content}
                editable={true}
                isMultiline={true}
                style={styles.contents}
                placeholder="답글을 달아주세요"
                handleInputChange={setContent}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <FontAwesome
                size={25}
                color={RED}
                name="comment-o"
              />
              <Button
                text="댓글 달기"
                textStyle={styles.buttonText}
                buttonStyle={styles.sendButton}
                handleClick={handleAddCommentButtonClick}
              />
            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default DetailComment;
