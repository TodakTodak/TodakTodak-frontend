import React, { useEffect, useState } from "react";
import {
  View,
  Keyboard,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title/Title";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";
import AnswerButtons from "./AnswerButtons/AnswerButtons";

import { addFriend } from "../../api/userApi";
import { patchCommentLike } from "../../api/commentApi";

import { patchMyComment } from "../../redux/userSlice";

import styles from "./styles";

import { SERVER_ERROR } from "../../constants/message";
import { DETAIL_POST } from "../../constants/navigationName";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

const Answer = ({ route }) => {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [isCommentLike, setIsCommentLike] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
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
        commentId: commentInfo._id
      };
      const response = await patchCommentLike(
        commentLikeInfo,
        user.accessToken
      );

      if (response.errorMessage) {
        setMessage(response.errorMessage);
        setIsModalVisible(true);
      }

      setIsCommentLike((isCommentLike) => !isCommentLike);
    } catch (err) {
      setMessage(SERVER_ERROR);
      setIsModalVisible(true);
    }
  };

  const handleAddFriendClick = async () => {
    try {
      const friendInfo = {
        targetUser: commentInfo.user
      };
      const response = await addFriend(
        friendInfo,
        user.accessToken
      );

      if (response.errorMessage) {
        setMessage(response.errorMessage);
      } else {
        setMessage("친구 요청을 했습니다!");
      }

      setIsModalVisible(true);
    } catch (err) {
      setMessage(SERVER_ERROR);
      setIsModalVisible(true);
    }
  };

  const handleModalCloseButton = () => {
    setIsModalVisible(false);
  };

  const handleRoutePostButtonClick = () => {
    navigation.navigate(DETAIL_POST, { postId });
  };

  const handleModifyButtonClick = () => {
    const modifyCommentInfo = {
      comment,
      commentId: commentInfo._id
    };

    dispatch(patchMyComment({
      commentInfo: modifyCommentInfo,
      accessToken: user.accessToken
    }));

    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundContainer}
      >
        <View style={styles.container}>
          <Title
            imageStyle={styles.titleImage}
            text={`${commentInfo.nickname}님의 답변`}
          />
          <View style={styles.postContentsWrapper}>
            <ImageBackground
              style={styles.letterPage}
              source={letterPage}
            >
              <ScrollView>
                <TextInput
                  value={comment}
                  editable={commentInfo.user === user.email}
                  isMultiline={true}
                  handleInputChange={setComment}
                  style={styles.contents}
                />
              </ScrollView>
            </ImageBackground>
          </View>
          <AnswerButtons
            user={user}
            postId={postId}
            commentInfo={commentInfo}
            isCommentLike={isCommentLike}
            handleAddFriendClick={handleAddFriendClick}
            handleCommentLikeClick={handleCommentLikeClick}
            handleModifyButtonClick={handleModifyButtonClick}
            handleRoutePostButtonClick={handleRoutePostButtonClick}
          />
        </View>
        <AlertModal
          message={message}
          isModalVisible={isModalVisible}
          handleModalClose={handleModalCloseButton}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

export default Answer;
