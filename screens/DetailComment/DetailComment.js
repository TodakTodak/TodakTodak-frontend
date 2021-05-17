import React, { useState } from "react";
import {
  View,
  Keyboard,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

import { patchComment } from "../../api/postApi";

import {
  BLACK,
  WHITE,
  TRANSPARENCY
} from "../../constants/color";

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

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  postContentsWrapper: {
    width: "90%",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden"
  },
  titleText: {
    fontSize: 40
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-25%",
    left: "-10%"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 500,
    marginTop: 30,
    backgroundColor: TRANSPARENCY,
    fontSize: 25,
  },
  letterPage: {
    width: "100%"
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  goodButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  sendButton: {
    width: "30%",
    margin: 20,
    backgroundColor: WHITE
  },
  buttonText: {
    color: BLACK,
    fontSize: 20
  },
  commentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 5
  }
});

export default DETAIL_COMMENT;
