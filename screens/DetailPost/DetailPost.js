import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  AntDesign,
  FontAwesome
} from "@expo/vector-icons";

import styles from "./styles";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Category from "../../components/Category/Category";
import TextInput from "../../components/TextInput/TextInput";
import SimpleComment from "../../components/SimpleComment/SimpleComment";

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
import { RED } from "../../constants/color";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

function DetailPost({ route }) {
  const [postInfo, setPostInfo] = useState({});
  const [isPostLike, setIsPostLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const { postId } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setIsLoading(true);

      try {
        const response = await getDetailPost(postId);

        if (response.errorMessage) {
          console.log("에러발생");
          return;
        }

        if (response.post.likes.includes(user.email)) {
          setIsPostLike(true);
        } else {
          setIsPostLike(false);
        }

        setPostInfo(response.post);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddCommentButtonClick = () => {
    navigation.navigate(DETAIL_COMMENT, { postId });
  };

  const handleLikeButtonClick = async () => {
    const likeInfo = {
      postId,
      user: user.email
    };

    try {
      const response = await patchPostLike(likeInfo);

      if (response.errorMessage) {
        console.log("에러 발생");
        return;
      }

      setIsPostLike((isPostLike) => !isPostLike);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCommentClick = (commentInfo) => {
    navigation.navigate(ANSWER, { commentInfo });
  };

  const handleModifyButtonClick = () => {
    navigation.navigate(WRITE_WORRY, { postInfo });
  };

  const handleCommentLikeClick = async (commentId) => {
    const likeInfo = {
      user: user.email,
      commentId,
      postId
    };

    try {
      const response = await patchPostCommentLike(likeInfo);

      if (response.errorMessage) {
        console.log("에러 발생");
        return;
      }

      setPostInfo(response.populatedPost);
    } catch (err) {
      console.log("에러 발생");
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <ScrollView style={styles.container} contentContainerStyle="center">
        <View>
          <Title
            textStyle={styles.titleText}
            imageStyle={styles.titleImage}
            text={postInfo.isAnonymous ? "익명의 고민" : `${postInfo.ownerNickname}의 고민`}
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
              <View style={styles.buttonWrapper}>
                <View style={styles.buttonContainer}>
                  <AntDesign
                    size={25}
                    color={RED}
                    name={isPostLike ? "like1" : "like2"}
                  />
                  <Button
                    text="위로하기"
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    handleClick={handleLikeButtonClick}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <FontAwesome
                    size={25}
                    color={RED}
                    name="comment-o"
                  />
                  <Button
                    text="댓글 달기"
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    handleClick={handleAddCommentButtonClick}
                  />
                </View>
                {postInfo.owner === user.email &&
                  <View style={styles.buttonContainer}>
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
                  </View>
                }
              </View>
            </ImageBackground>
          </View>
          <View style={styles.commentContainer}>
            {postInfo.comments && renderComments()}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default DetailPost;
