import React, { useEffect, useState } from "react";
import {
  View,
  Keyboard,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import styles from "./styles";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import {
  patchComment,
  patchCommentLike
} from "../../api/commentApi";
import { addFriend } from "../../api/userApi";

import { RED } from "../../constants/color";
import { DETAIL_POST } from "../../constants/navigationName";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

function Answer({ route }) {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [isCommentLike, setIsCommentLike] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();
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
    navigation.navigate(DETAIL_POST, { postId });
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
                          color={RED}
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
                          color={RED}
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
                      color={RED}
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
                        color={RED}
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

export default Answer;
