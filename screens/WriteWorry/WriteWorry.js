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

import styles from "./styles";

import Title from "../../components/Title/Title";
import Picker from "../../components/Picker/Picker";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";
import WriteWorryButtons from "./WriteWorryButtons/WriteWorryButtons";

import { postNewWorryPost, patchPost } from "../../api/postApi";
import { validatePostInfo } from "../../validation/postValidation";

import {
  DETAIL_POST,
  MY_POST_STORAGE
} from "../../constants/navigationName";
import {
  PAIN,
  LOVE,
  COURSE,
  FRIEND,
  EMPLOYMENT
} from "../../constants/category";
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

  const postTypes = [
    { label: PUBLIC, value: PUBLIC },
    { label: PRIVATE, value: PRIVATE }
  ];
  const anonymousTypes = [
    { label: NICKNAME, value: NICKNAME },
    { label: ANONYMOUNS, value: ANONYMOUNS }
  ];
  const categoryTypes = [
    { label: PAIN, value: PAIN },
    { label: LOVE, value: LOVE },
    { label: COURSE, value: COURSE },
    { label: FRIEND, value: FRIEND },
    { label: EMPLOYMENT, value: EMPLOYMENT }
  ];

  const handlePostPickerChange = (item) => {
    setPostType(item);
  };

  const handleAnonymousePickerChange = (item) => {
    setAnonymousType(item);
  };

  const handleCategoryPickerChange = (item) => {
    setCategory(item);
  };

  const handleWorryContentsChange = (contents) => {
    setWorryContents(contents);
  };

  const handlePostTitleChange = (title) => {
    setPostTitle(title);
  };

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
                <TextInput
                  value={postTitle}
                  style={styles.postTitle}
                  placeholder="고민의 제목을 적어주세요"
                  handleInputChange={handlePostTitleChange}
                />
                <TextInput
                  isMultiline={true}
                  value={worryContents}
                  style={styles.contents}
                  placeholder="고민 거리를 작성해보세요"
                  handleInputChange={handleWorryContentsChange}
                />
                <Picker
                  label="공개 여부"
                  value={postType}
                  itemList={postTypes}
                  handleChange={handlePostPickerChange}
                />
                <Picker
                  label="익명 여부"
                  value={anonymousType}
                  itemList={anonymousTypes}
                  handleChange={handleAnonymousePickerChange}
                />
                <Picker
                  label="고민 카테고리"
                  value={category}
                  itemList={categoryTypes}
                  handleChange={handleCategoryPickerChange}
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
    </ImageBackground>
  );
}

export default WriteWorry;
