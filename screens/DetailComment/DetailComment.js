import React, { useState } from "react";
import {
  View,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView
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
import AlertModal from "../../components/AlertModal/AlertModal";

const DetailComment = ({ route }) => {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const { postId } = route.params;

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const handleAddCommentButtonClick = async () => {
    const commentInfo = {
      postId,
      content: content.trim()
    };

    try {
      const response = await patchComment(commentInfo, user.accessToken);

      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
        return;
      }

      navigation.goBack();
    } catch (err) {
      setErrorMessage("에러가 발생했습니다");
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
            <ScrollView>
              <View>
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
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
        {errorMessage &&
          <AlertModal
            message={errorMessage}
            handleModalClose={clearErrorMessage}
          />
        }
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default DetailComment;
