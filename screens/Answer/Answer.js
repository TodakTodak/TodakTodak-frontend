import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Modal
} from "react-native";
import { useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Category from "../../components/Category/Category";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import { patchCommentLike } from "../../api/commentApi";
import { addFriend } from "../../api/userApi";

import love from "../../assets/pngs/love.png";
import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";
import { NANUM_REGULAR } from "../../constants/font";

function Answer({ route }) {
  const [likes, setLikes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.userReducer);
  const {
    category,
    commentInfo,
    postContent
  } = route.params;

  useEffect(() => {
    setLikes(commentInfo.likes);
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

      setLikes(response.commentLikeList);
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
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title
          textStyle={styles.titleText}
          imageStyle={styles.titleImage}
          text={`${commentInfo.user}님의 답변`}
        />
        <View style={styles.postContentsWrapper}>
          <ImageBackground
            style={styles.letterPage}
            source={letterPage}
          >
            <View style={styles.categoryWrapper}>
              <Category title={category} />
              <TextInput
                value={postContent}
                editable={false}
                isMultiline={true}
                style={styles.contents}
              />
            </View>
            <View>
              <TextInput
                value={commentInfo.content}
                editable={false}
                isMultiline={true}
                style={styles.contents}
              />
              <View style={styles.buttonWrapper}>
                <Button
                  text="친구 추가"
                  textStyle={styles.buttonText}
                  buttonStyle={styles.sendButton}
                  handleClick={handleAddFriendClick}
                />
                <Button
                  image={love}
                  textStyle={styles.commentText}
                  buttonStyle={styles.commentLike}
                  imageStyle={styles.commentImage}
                  handleClick={handleCommentLikeClick}
                  text={`${likes.length}쓰담`}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
        <AlertModal
          message={message}
          modalVisable={isModalVisible}
          handleModalVisable={handleModalCloseButton}
        />
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
    alignItems: "center"
  },
  postContentsWrapper: {
    width: "90%",
    marginTop: 10,
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
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 200,
    marginTop: 30
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
  commentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 5
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
    marginRight: 5
  },
  commentText: {
    fontSize: 18,
    fontFamily: NANUM_REGULAR,
    color: "#000000"
  }
});

export default Answer;
