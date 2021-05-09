import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View
} from "react-native";
import { useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Category from "../../components/Category/Category";
import TextInput from "../../components/TextInput/TextInput";

import { postComment } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";

function DetailPost({ route }) {
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.userReducer);
  const {
    postId,
    userId,
    contents,
    category,
    postOwner,
    inputStyle
  } = route.params;

  const handleSympathyButtonClick = async () => {
    const commentInfo = { user, postId, content };

    try {
      const response = await postComment(commentInfo);
      
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title
          imageStyle={styles.titleImage}
          text={userId ? `${postOwner}의 고민` : "나의 고민"}
        />
        <View style={styles.postContentsWrapper}>
          <View style={styles.categoryWrapper}>
            <Category title={category} />
            <TextInput
              value={contents}
              editable={false}
              isMultiline={true}
              style={[styles.contents, inputStyle]}
            />
          </View>
          {userId &&
            <View>
              <TextInput
                value={content}
                editable={true}
                isMultiline={true}
                handleInputChange={setContent}
                style={[styles.contents, inputStyle]}
                placeholder="본인의 이야기 혹은 위로를 적어주세요"
              />
              <Button
                text="공감하기"
                textStyle={styles.buttonText}
                buttonStyle={styles.sendButton}
                handleClick={handleSympathyButtonClick}
              />
            </View>
          }
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
    height: "100%"
  },
  postContentsWrapper: {
    borderBottomWidth: 3,
    borderBottomColor: "#ffffff"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 50
  },
  contents: {
    height: 400,
    marginTop: 30
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
});

export default DetailPost;
