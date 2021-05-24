import React, { useState } from "react";
import {
  View,
  Keyboard,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import styles from "./styles";

import { RED } from "../../constants/color";
import { SERVER_ERROR } from "../../constants/message";

import { patchComment } from "../../api/postApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

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
      setErrorMessage(SERVER_ERROR);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}
      >
        <KeyboardAwareScrollView>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.title}>
              <Title
                text="댓글 작성"
                textStyle={styles.titleText}
                imageStyle={styles.titleImage}
              />
            </View>
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
              </ImageBackground>
            </View>
            <TouchableHighlight
              style={styles.buttonWrapper}
              onPress={handleAddCommentButtonClick}
              underlayColor="rgba(255, 255, 255, 0.6)"
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <FontAwesome
                  style={{ padding: 10 }}
                  size={25}
                  color={RED}
                  name="comment-o"
                />
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>댓글 달기</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </KeyboardAwareScrollView>
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
