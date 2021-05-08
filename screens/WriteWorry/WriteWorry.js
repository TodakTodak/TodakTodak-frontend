import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground
} from "react-native";
import { useSelector } from "react-redux";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import Picker from "../../components/Picker/Picker";
import TextInput from "../../components/TextInput/TextInput";

import { postNewWorryPost } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";

function WriteWorry({ navigation }) {
  const [postType, setPostType] = useState("");
  const [anonymousType, setAnonymousType] = useState("");
  const [category, setCategory] = useState("");
  const [worryContents, setWorryContents] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const user = useSelector((state) => state.userReducer);

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
      <View style={styles.container}>
        <Title
          text="고민 작성소"
          textStyle={styles.title}
          imageStyle={styles.titleImage}
        />
        <Button
          text="떠나보내기"
          buttonStyle={styles.sendButton}
          textStyle={styles.buttonText}
          handleClick={handleSubmitButtonClick}
        />
        <View style={styles.writeWrapper}>
          <Picker
            handleChange={handlePostPickerChange}
            itemList={postTypes}
            label="공개 여부"
          />
          <Picker
            handleChange={handleAnonymousePickerChange}
            itemList={anonymousTypes}
            label="익명 여부"
          />
          <Picker
            handleChange={handleCategoryPickerChange}
            itemList={categoryTypes}
            label="고민 카테고리"
          />
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
        </View>
      </View>
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
    height: "100%",
  },
  title: {
    height: 50,
    fontSize: 30
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-55%",
    left: "27%"
  },
  sendButton: {
    left: "70%",
    width: "30%",
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
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  },
  postTitle: {
    height: 35,
    margin: 30,
    marginBottom: 0
  },
  contents: {
    height: 300
  }
});

export default WriteWorry;
