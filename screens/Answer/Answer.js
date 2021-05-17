import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  StyleSheet,
  View,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import {
  patchComment,
  patchCommentLike
} from "../../api/commentApi";
import { addFriend } from "../../api/userApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

function Answer({ route, navigation }) {
  const [comment, setComment] = useState("");
  const [isCommentLike, setIsCommentLike] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user);
  const { commentInfo, postId } = route.params;

  useEffect(() => {
    setComment(commentInfo.content);
  }, []);

  useEffect(() => {
    if (commentInfo.likes.includes(user.email)) {
      setIsCommentLike(true);
    } else {
      setIsCommentLike(false);
    }
  }, []);

  const handleCommentLikeClick = async () => {
    try {
      const commentLikeInfo = {
        user: user.email,
        commentId: commentInfo._id
      };
      const response = await patchCommentLike(commentLikeInfo);

      if (response.errorMessage) {
        console.log("에러발생");
      }

      setIsCommentLike((isCommentLike) => !isCommentLike);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddFriendClick = async () => {
    try {
      const friendInfo = {
        currentUser: user.email,
        targetUser: commentInfo.user
      };
      const response = await addFriend(friendInfo);

      if (response.errorMessage) {
        setMessage(response.errorMessage);
      } else {
        setMessage("친구 요청을 했습니다!");
      }

      setIsModalVisible(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleModalCloseButton = () => {
    setIsModalVisible(false);
  };

  const handleRoutePostButtonClick = () => {
    navigation.navigate("DetailPost", { postId });
  };

  const handleModifyButtonClick = async () => {
    const modifyCommentInfo = {
      comment,
      commentId: commentInfo._id
    };
    try {
      await patchComment(modifyCommentInfo);

      navigation.navigate(navigation.goBack());
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
        <View>
          <Title
            imageStyle={styles.titleImage}
            text={`${commentInfo.user}님의 답변`}
          />
          <View style={styles.postContentsWrapper}>
            <View>
              <ImageBackground
                style={styles.letterPage}
                source={letterPage}
              >
                <TextInput
                  value={comment}
                  editable={commentInfo.user === user.email}
                  isMultiline={true}
                  handleInputChange={setComment}
                  style={styles.contents}
                />
                <View style={styles.buttonWrapper}>
                  <View style={styles.buttonContainer}>
                    {commentInfo.user === user.email ?
                      <>
                        <Ionicons
                          size={25}
                          color="red"
                          name="document"
                        />
                        <Button
                          text="수정 하기"
                          buttonStyle={styles.button}
                          textStyle={styles.buttonText}
                          handleClick={handleModifyButtonClick}
                        />
                      </> :
                      <>
                        <AntDesign
                          size={25}
                          color="red"
                          name="adduser"
                        />
                        <Button
                          text="친구추가"
                          buttonStyle={styles.button}
                          textStyle={styles.buttonText}
                          handleClick={handleAddFriendClick}
                        />
                      </>
                    }
                  </View>
                  <View style={styles.buttonContainer}>
                    <AntDesign
                      size={25}
                      color="red"
                      name={isCommentLike ? "like1" : "like2"}
                    />
                    <Button
                      text="쓰담쓰담"
                      buttonStyle={styles.button}
                      textStyle={styles.buttonText}
                      handleClick={handleCommentLikeClick}
                    />
                  </View>
                  {postId &&
                    <View style={styles.buttonContainer}>
                      <AntDesign
                        size={25}
                        color="red"
                        name="inbox"
                      />
                      <Button
                        text="게시물로"
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        handleClick={handleRoutePostButtonClick}
                      />
                    </View>
                  }
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>
        <AlertModal
          message={message}
          modalVisable={isModalVisible}
          handleModalClose={handleModalCloseButton}
        />
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
    height: "100%",
    alignItems: "center"
  },
  postContentsWrapper: {
    width: "90%",
    marginTop: 30,
    borderRadius: 20,
    overflow: "hidden"
  },
  titleImage: {
    left: "15%"
  },
  contents: {
    height: 530,
    marginTop: 30,
    backgroundColor: "rgba(0, 0, 0, 0)",
    fontSize: 20
  },
  letterPage: {
    width: "100%"
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: "20%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  buttonText: {
    color: "#000000",
    fontSize: 18
  }
});

export default Answer;
