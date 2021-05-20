import React, { useEffect, useState } from "react";
import {
  View,
  Keyboard,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Title from "../../components/Title/Title";
import AlertModal from "../../components/AlertModal/AlertModal";
import WorryInputs from "./WorryInputs/WorryInputs";
import WorryInfoPickers from "./WorryInfoPickers/WorryInfoPickers";
import WriteWorryButtons from "./WriteWorryButtons/WriteWorryButtons";

import { postNewWorryPost, patchPost } from "../../api/postApi";
import { validatePostInfo } from "../../validation/postValidation";

import styles from "./styles";

import {
  DETAIL_POST,
  MY_POST_STORAGE
} from "../../constants/navigationName";
import {
  PUBLIC,
  PRIVATE,
  NICKNAME,
  ANONYMOUNS
} from "../../constants/postInfo";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

const WriteWorry = ({ route }) => {
  const [postType, setPostType] = useState("");
  const [category, setCategory] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [anonymousType, setAnonymousType] = useState("");
  const [worryContents, setWorryContents] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const { postInfo } = route.params;

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      if (0 < Object.keys(postInfo).length) {
        const {
          title,
          category,
          isPublic,
          contents,
          isAnonymous
        } = postInfo;

        setPostTitle(title);
        setCategory(category);
        setWorryContents(contents);
        setPostType(isPublic ? PUBLIC : PRIVATE);
        setAnonymousType(isAnonymous ? ANONYMOUNS : NICKNAME);
      } else {
        setPostType("");
        setCategory("");
        setPostTitle("");
        setWorryContents("");
        setAnonymousType("");
      }
    });

    return unSubscribe;
  }, [navigation]);

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const handleSubmitButtonClick = async () => {
    const postInfo = {
      postType,
      category,
      postTitle,
      anonymousType,
      worryContents
    };

    const incorrectMessage = validatePostInfo(postInfo);

    if (incorrectMessage) {
      setErrorMessage(incorrectMessage);
      return;
    }

    try {
      const response = await postNewWorryPost(postInfo, user.accessToken);

      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
        return;
      }

      navigation.navigate(MY_POST_STORAGE);
    } catch (err) {
      setErrorMessage("에러가 발생했습니다.");
    }
  };

  const handleModifyButtonClick = async () => {
    const modifyPostInfo = {
      postType,
      category,
      postTitle,
      anonymousType,
      worryContents,
      postId: postInfo._id
    };

    const incorrectMessage = validatePostInfo(modifyPostInfo);

    if (incorrectMessage) {
      setErrorMessage(incorrectMessage);
      return;
    }

    try {
      await patchPost(modifyPostInfo, user.accessToken);

      navigation.navigate(DETAIL_POST, { postId: postInfo._id });
    } catch (err) {
      setErrorMessage("에러가 발생했습니다.");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <KeyboardAwareScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Title
              text="고민 작성소"
              textStyle={styles.titleText}
              imageStyle={styles.titleImage}
            />
            <WriteWorryButtons
              postInfo={postInfo}
              handleModifyButtonClick={handleModifyButtonClick}
              handleSubmitButtonClick={handleSubmitButtonClick}
            />
            <View style={styles.writeWrapper}>
              <ImageBackground
                style={styles.letter}
                source={letterPage}
              >
                <ScrollView>
                  <WorryInputs
                    postTitle={postTitle}
                    worryContents={worryContents}
                    handleTitleChange={setPostTitle}
                    handleContentsChange={setWorryContents}
                  />
                  <WorryInfoPickers
                    postType={postType}
                    category={category}
                    anonymousType={anonymousType}
                    handlePostPickerChange={setPostType}
                    handleCategoryPickerChange={setCategory}
                    handleAnonymousePickerChange={setAnonymousType}
                  />
                </ScrollView>
              </ImageBackground>
            </View>
            {errorMessage &&
              <AlertModal
                message={errorMessage}
                handleModalClose={clearErrorMessage}
              />
            }
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

export default WriteWorry;
