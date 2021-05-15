import React, { useEffect, useState } from "react";
import {
  View,
  Keyboard,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useSelector } from "react-redux";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import Picker from "../../components/Picker/Picker";
import TextInput from "../../components/TextInput/TextInput";

import { postNewWorryPost } from "../../api/postApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

function WriteWorry({ navigation }) {
  const [postType, setPostType] = useState("");
  const [anonymousType, setAnonymousType] = useState("");
  const [category, setCategory] = useState("");
  const [worryContents, setWorryContents] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      setPostType("");
      setAnonymousType("");
      setCategory("");
      setWorryContents("");
      setPostTitle("");
    });

    return unSubscribe;
  }, [navigation]);

  const postTypes = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" }
  ];
  const anonymousTypes = [
    { label: "anonymouns", value: "anonymouns" },
    { label: "nickname", value: "nickname" }
  ];
  const categoryTypes = [
    { label: "사랑", value: "사랑" },
    { label: "진로", value: "진로" },
    { label: "취업", value: "취업" },
    { label: "친구", value: "친구" },
    { label: "고통", value: "고통" }
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

  const handleSubmitButtonClick = async () => {
    const postInfo = {
      postType,
      anonymousType,
      category,
      worryContents,
      postTitle,
      user
    };
    try {
      await postNewWorryPost(postInfo);
    } catch (err) {
      console.log(err.message);
    } finally {
      navigation.navigate("MyPostStorage");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Title
            text="고민 작성소"
            textStyle={styles.titleText}
            imageStyle={styles.titleImage}
          />
          <Button
            text="고민 제출하기"
            buttonStyle={styles.sendButton}
            textStyle={styles.buttonText}
            handleClick={handleSubmitButtonClick}
          />
          <View style={styles.writeWrapper}>
            <ImageBackground
              style={styles.letter}
              source={letterPage}
            >
              <TextInput
                style={styles.postTitle}
                handleInputChange={handlePostTitleChange}
                value={postTitle}
                placeholder="고민의 제목을 적어주세요"
              />
              <TextInput
                style={styles.contents}
                isMultiline={true}
                handleInputChange={handleWorryContentsChange}
                value={worryContents}
                placeholder="고민 거리를 작성해보세요"
              />
              <Picker
                handleChange={handlePostPickerChange}
                itemList={postTypes}
                label="공개 여부"
                value={postType}
              />
              <Picker
                handleChange={handleAnonymousePickerChange}
                itemList={anonymousTypes}
                label="익명 여부"
                value={anonymousType}
              />
              <Picker
                handleChange={handleCategoryPickerChange}
                itemList={categoryTypes}
                label="고민 카테고리"
                value={category}
              />
            </ImageBackground>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
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
  sendButton: {
    left: "64%",
    width: "35%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  buttonText: {
    color: "yellow",
    fontSize: 15
  },
  writeWrapper: {
    width: "90%",
    height: "70%",
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  letter: {
    width: "100%",
    height: "100%"
  },
  postTitle: {
    height: 35,
    margin: 30,
    marginBottom: 0
  },
  contents: {
    height: 220
  }
});

export default WriteWorry;
