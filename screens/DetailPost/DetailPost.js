import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View
} from "react-native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Category from "../../components/Category/Category";
import TextInput from "../../components/TextInput/TextInput";
import SimpleComment from "../../components/SimpleComment/SimpleComment";

import { postComment, patchPost } from "../../api/postApi";

import letterPage from "../../assets/pngs/letterPage.png";
import backgroundImage from "../../assets/pngs/background.png";

function DetailPost({ route }) {
  const [content, setContent] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [postsComments, setPostComments] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const {
    likes, // 좋아요 기능용 prop
    postId,
    userId,
    contents,
    comments,
    category,
    postOwner,
    myComment,
    inputStyle
  } = route.params;

  useEffect(() => {
    setPostComments(comments);
  }, []);

  useEffect(() => {
    if (myComment) {
      setContent(myComment);
    }
  }, []);

  useEffect(() => {
    if (likes) {
      if (likes.includes(user.email)) {
        setIsLike(true);

        return;
      }

      setIsLike(false);
    }
  }, []);

  const handleSympathyButtonClick = async () => {
    const commentInfo = {
      user,
      postId,
      content: content.trim()
    };

    try {
      const response = await postComment(commentInfo);

      if (response.errorMessage) {
        console.log("에러 발생");
        return;
      }

      const newComment = {
        likes: [],
        user: user.email,
        content: content.trim()
      };

      setPostComments((postsComments) => [...postsComments, newComment]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickLikeButton = async () => {
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

      setIsLike((isLike) => !isLike);
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderComments = () => {
    return postsComments.map((postComment) =>
      <SimpleComment key={postComment._id} postComment={postComment} />
    );
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
          text={userId ? `${postOwner}의 고민` : "나의 고민"}
        />
        <View style={styles.postContentsWrapper}>
          <ImageBackground
            style={styles.letterPage}
            source={letterPage}
          >
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
                <View style={styles.buttonWrapper}>
                  <View style={styles.goodButtonContainer}>
                    <Entypo
                      size={25}
                      color="yellow"
                      name={isLike ? "star" : "star-outlined"}
                    />
                    <Button
                      text="토닥 토닥"
                      textStyle={styles.buttonText}
                      buttonStyle={styles.sendButton}
                      handleClick={handleClickLikeButton}
                    />
                  </View>
                  <Button
                    text="공감하기"
                    textStyle={styles.buttonText}
                    buttonStyle={styles.sendButton}
                    handleClick={handleSympathyButtonClick}
                  />
                </View>
              </View>
            }
          </ImageBackground>
        </View>
        <ScrollView>
          <View style={styles.commentContainer}>
            {0 < postsComments.length && renderComments()}
          </View>
        </ScrollView>
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
    left: "-7%"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 400,
    marginTop: 30
  },
  letterPage: {
    width: "100%"
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  }
});

export default DetailPost;
