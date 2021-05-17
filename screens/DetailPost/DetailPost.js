import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  AntDesign,
  FontAwesome
} from "@expo/vector-icons";

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

        setPostInfo(response.post);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (postInfo.likes) {
      const isLikedUser = postInfo.likes.includes(user.email);

      if (isLikedUser) {
        return setIsPostLike(true);
      }

      setIsPostLike(false);
    }
  }, []);

  const handleAddCommentButtonClick = () => {
    navigation.navigate("DetailComment", { postId });
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
    navigation.navigate("Answer", { commentInfo });
  };

  const handleModifyButtonClick = () => {
    navigation.navigate("WriteWorry", { postInfo });
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
            text={`${postInfo.ownerNickname}의 고민`}
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
                    color="red"
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
                    color="red"
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
                      color="red"
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
    width: "90%",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 550,
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
  },
  commentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 5
  }
});

export default DetailPost;
