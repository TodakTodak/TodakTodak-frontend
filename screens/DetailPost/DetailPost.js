import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View
} from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Category from "../../components/Category/Category";
import TextInput from "../../components/TextInput/TextInput";
import SimpleComment from "../../components/SimpleComment/SimpleComment";

import {
  patchPost,
  patchPostCommentLike,
  getDetailPost
} from "../../api/postApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

function DetailPost({ route }) {
  const [postInfo, setPostInfo] = useState({});
  const [isPostLike, setIsPostLike] = useState(false);
  const user = useSelector((state) => state.userReducer);
  const navigation = useNavigation();
  const { postId } = route.params;

  useEffect(() => {
    (async function getPostInfo() {
      try {
        const response = await getDetailPost(postId);

        if (response.errorMessage) {
          console.log("에러발생");
          return;
        }

        setPostInfo(response.post);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

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
      const response = await patchPost(likeInfo);

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
            text={`${postInfo.owner}의 고민`}
          />
          <View style={styles.postContentsWrapper}>
            <ImageBackground
              style={styles.letterPage}
              source={letterPage}
            >
              <View style={styles.categoryWrapper}>
                <Category title={postInfo.category} />
                <TextInput
                  value={postInfo.contents}
                  editable={user.email === postInfo.owner}
                  isMultiline={true}
                  style={styles.contents}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <View style={styles.goodButtonContainer}>
                  <Entypo
                    size={25}
                    color="red"
                    name={isPostLike ? "heart" : "heart-outlined"}
                  />
                  <Button
                    text="고민 위로하기"
                    textStyle={styles.buttonText}
                    buttonStyle={styles.sendButton}
                    handleClick={handleLikeButtonClick}
                  />
                </View>
                <Button
                  text="댓글 달기"
                  textStyle={styles.buttonText}
                  buttonStyle={styles.sendButton}
                  handleClick={handleAddCommentButtonClick}
                />
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
  titleText: {
    fontSize: 50
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-25%",
    left: "25%"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 520,
    backgroundColor: "rgba(0, 0, 0, 0)",
    fontSize: 30
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
    width: "50%",
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
  }
});

export default DetailPost;
