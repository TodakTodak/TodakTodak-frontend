import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import Category from "../../components/Category/Category";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";
import SimpleComment from "../../components/SimpleComment/SimpleComment";
import DetailPostButtons from "./DetailPostButtons/DetailPostButtons";

import {
  patchPostLike,
  getDetailPost,
  patchPostCommentLike
} from "../../api/postApi";

import {
  ANSWER,
  WRITE_WORRY,
  DETAIL_COMMENT
} from  "../../constants/navigationName";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

const DetailPost = ({ route }) => {
  const [postInfo, setPostInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPostLike, setIsPostLike] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const { postId } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setIsLoading(true);

      try {
        const response = await getDetailPost(postId, user.accessToken);

        if (response.errorMessage) {
          setErrorMessage(response.errorMessage);
          return;
        }

        if (response.post.likes.includes(user.email)) {
          setIsPostLike(true);
        } else {
          setIsPostLike(false);
        }

        setPostInfo(response.post);
      } catch (err) {
        setErrorMessage("에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  if (isLoading) {
    return <Loading />;
  }

  const handleAddCommentButtonClick = () => {
    navigation.navigate(DETAIL_COMMENT, { postId });
  };

  const handleCommentClick = (commentInfo) => {
    navigation.navigate(ANSWER, { commentInfo });
  };

  const handleModifyButtonClick = () => {
    navigation.navigate(WRITE_WORRY, { postInfo });
  };

  const clearMessage = () => {
    setErrorMessage(null);
  };

  const handleLikeButtonClick = async () => {
    const likeInfo = { postId };

    try {
      const response = await patchPostLike(likeInfo, user.accessToken);

      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
        return;
      }

      setIsPostLike((isPostLike) => !isPostLike);
    } catch (err) {
      setErrorMessage("에러가 발생했습니다.");
    }
  };

  const handleCommentLikeClick = async (commentId) => {
    const likeInfo = { postId, commentId };

    try {
      const response = await patchPostCommentLike(likeInfo, user.accessToken);

      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
        return;
      }

      setPostInfo(response.populatedPost);
    } catch (err) {
      setErrorMessage("에러가 발생했습니다.");
    }
  };

  const renderComments = () => {
    const postComments = postInfo.comments;

    return postComments.map((postComment) =>
      <SimpleComment
        key={postComment._id}
        postComment={postComment}
        handleCommentClick={handleCommentClick}
        handleLikeIconClick={handleCommentLikeClick}
      />
    );
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle="center"
      >
        <>
          <Title
            textStyle={styles.titleText}
            imageStyle={styles.titleImage}
            text={
              postInfo.isAnonymous
                ? "익명의 고민"
                : `${postInfo.ownerNickname}님의 고민`
            }
          />
          <View style={styles.postContentsWrapper}>
            <ImageBackground
              style={styles.letterPage}
              source={letterPage}
            >
              <View style={styles.categoryWrapper}>
                <Category title={postInfo.category} />
                <TextInput
                  editable={false}
                  isMultiline={true}
                  style={styles.contents}
                  value={postInfo.contents}
                />
              </View>
              <DetailPostButtons
                user={user}
                postInfo={postInfo}
                isPostLike={isPostLike}
                handleLikeButtonClick={handleLikeButtonClick}
                handleModifyButtonClick={handleModifyButtonClick}
                handleAddCommentButtonClick={handleAddCommentButtonClick}
              />
            </ImageBackground>
          </View>
          <View style={styles.commentContainer}>
            {postInfo.comments && renderComments()}
          </View>
        </>
      </ScrollView>
      {errorMessage &&
        <AlertModal
          message={errorMessage}
          handleModalClose={clearMessage}
        />
      }
    </ImageBackground>
  );
}

export default DetailPost;
