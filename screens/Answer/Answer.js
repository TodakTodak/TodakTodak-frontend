import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  StyleSheet,
  View
} from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import { patchCommentLike } from "../../api/commentApi";
import { addFriend } from "../../api/userApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";
import { NANUM_REGULAR } from "../../constants/font";

function Answer({ route }) {
  const [comment, setComment] = useState("");
  const [isCommentLike, setIsCommentLike] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.userReducer);
  const { commentInfo } = route.params;

  useEffect(() => {
    setComment(commentInfo.content);
  }, []);

  useEffect(() => {
    if (commentInfo.likes.includes(user.email)) {
      setIsCommentLike(true);

      return;
    }

    setIsCommentLike(false);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}
      >
        <Title
          textStyle={styles.titleText}
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
                <Button
                  text="친구 추가"
                  textStyle={styles.buttonText}
                  buttonStyle={styles.sendButton}
                  handleClick={handleAddFriendClick}
                />
                <View style={styles.goodButtonContainer}>
                  <Entypo
                    size={25}
                    color="red"
                    name={isCommentLike ? "heart" : "heart-outlined"}
                  />
                  <Button
                    textStyle={styles.commentText}
                    buttonStyle={styles.commentLike}
                    imageStyle={styles.commentImage}
                    handleClick={handleCommentLikeClick}
                    text="쓰담쓰담"
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        <AlertModal
          message={message}
          modalVisable={isModalVisible}
          handleModalVisable={handleModalCloseButton}
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
  titleText: {
    fontSize: 50
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-25%",
    left: "-8%"
  },
  contents: {
    height: 530,
    marginTop: 30,
    backgroundColor: "rgba(0, 0, 0, 0)",
    fontSize: 25
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
    width: "45%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  buttonText: {
    color: "#000000",
    fontSize: 20
  },
  commentLike: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  commentImage: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  commentText: {
    fontSize: 18,
    fontFamily: NANUM_REGULAR,
    color: "#000000"
  }
});

export default Answer;
