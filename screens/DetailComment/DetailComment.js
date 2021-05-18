import React, { useState } from "react";
import {
  View,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import styles from "./styles";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

import { patchComment } from "../../api/postApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

function DETAIL_COMMENT({ route }) {
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
          textStyle={styles.titleText}
          imageStyle={styles.titleImage}
          text="댓글 작성"
        />
        <View style={styles.postContentsWrapper}>
          <ImageBackground
            style={styles.letterPage}
            source={letterPage}
          >
            <View style={styles.categoryWrapper}>
              <TextInput
                value={content}
                handleInputChange={setContent}
                editable={true}
                isMultiline={true}
                placeholder="답글을 달아주세요"
                style={styles.contents}
              />
            </View>
            <View style={styles.buttonWrapper}>
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

export default DETAIL_COMMENT;
