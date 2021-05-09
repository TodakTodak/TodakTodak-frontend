import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View
} from "react-native";
import { useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import PostCard from "../../components/PostCard/PostCard";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import { getMyPosts, getMyComments } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";
import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";

function MyPostStorage({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [activeCategory, setActiveCategory] = useState("토닥 토닥");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (activeCategory === "토닥 토닥" && !posts.length) {
      (async function getPosts() {
        try {
          const { postsInfo, errorMessage } = await getMyPosts(user.email);

          if (errorMessage) {
            setErrorMessage(errorMessage);
            return;
          }

          setPosts(postsInfo);
        } catch (err) {
          console.log("에러발생");

          setErrorMessage("포스트를 가져오는데 실패했습니다");
        }
      })();
    }

    if (activeCategory === "쓰담 쓰담" && !comments.length) {
      (async function getComments() {
        try {
          const { commentsInfo, errorMessage } = await getMyComments(user.email);

          if (errorMessage) {
            setErrorMessage(errorMessage);
            return;
          }

          setComments(commentsInfo);
        } catch (err) {
          console.log("에러발생");

          setErrorMessage("포스트를 가져오는데 실패했습니다");
        }
      })();
    }
  }, [activeCategory]);

  const renderMyPosts = () => {
    if (!posts) return;

    return posts.map((post) => {
      const {
        _id,
        title,
        contents,
        category,
        comments
      } = post;

      const handlePostClick = () => {
        navigation.navigate("DetailPost", {
          contents,
          category,
          comments
        });
      };

      return (
        <PostCard
          key={_id}
          postTitle={title}
          postCategory={category}
          handleClick={handlePostClick}
        />
      );
    });
  };

  const renderMyComments = () => {
    if (!comments) return;

    return comments.map((comment) => {
      const {
        _id,
        post,
        user,
        likes,
        content,
        createdAt
      } = comment;

      const handleCommentClick = () => {
        const {
          _id,
          comments,
          contents,
          category,
          isAnonymous,
          ownerNickname,
        } = post;

        navigation.navigate("DetailPost", {
          contents,
          comments,
          postId: _id,
          userId: user,
          category: category,
          myComment: content,
          inputStyle: styles.postStyle,
          postOwner: isAnonymous ? "익명" : ownerNickname
        });
      };

      return (
        <CategoryPostCard
          key={_id}
          isComment={true}
          comments={likes}
          title={post.title}
          ownerNickname={user}
          createdAt={createdAt}
          handleClick={handleCommentClick}
        />
      );
    });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title
          text="고민 저장소"
          textStyle={styles.titleText}
          imageStyle={styles.titleImage}
        />
        <View style={styles.categorysWrapper}>
          <CategoryButton
            title="토닥 토닥"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
          <CategoryButton
            title="쓰담 쓰담"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
            categoryStyle={styles.thudamCategory}
          />
        </View>
        <ScrollView styles={styles.postsWrapper}>
          {activeCategory === "토닥 토닥" ?
            renderMyPosts() :
            renderMyComments()
          }
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
    height: "100%"
  },
  titleText: {
    height: 50,
    fontSize: 40
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-45%",
    left: "27%"
  },
  categorysWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  },
  thudamCategory: {
    backgroundColor: "rgba(239, 255, 56, 0.3)"
  },
  postsWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    marginTop: 40
  },
  postStyle: {
    height: 150
  }
});

export default MyPostStorage;
