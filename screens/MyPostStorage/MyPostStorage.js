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
  const [activeCategory, setActiveCategory] = useState("나의 고민들");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      if (activeCategory === "나의 고민들") {
        (async function getPosts() {
          try {
            const response = await getMyPosts(user.email);

            if (response.errorMessage) {
              setErrorMessage(response.errorMessage);
              return;
            }

            setPosts(response.postsInfo);
          } catch (err) {
            console.log("에러발생");

            setErrorMessage("포스트를 가져오는데 실패했습니다");
          }
        })();
      }

      if (activeCategory === "나의 위로들") {
        (async function getComments() {
          try {
            const response = await getMyComments(user.email);

            if (response.errorMessage) {
              setErrorMessage(response.errorMessage);
              return;
            }

            setComments(response.commentsInfo);
          } catch (err) {
            console.log("에러발생");

            setErrorMessage("포스트를 가져오는데 실패했습니다");
          }
        })();
      }

      return unSubscribe;
    });
  }, [activeCategory]);

  const renderMyPosts = () => {
    if (!posts) return;

    return posts.map((post) => {
      const {
        _id,
        title,
        category
      } = post;

      const handlePostClick = () => (
        navigation.navigate("DetailPost", { postId: _id })
      );

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
          ownerNickname
        } = post;

        navigation.navigate("DetailPost", {
          contents,
          comments,
          postId: _id,
          userId: user,
          likes: post.likes,
          category: category,
          myComment: content,
          inputStyle: styles.postStyle,
          postOwner: isAnonymous ? "익명" : ownerNickname
        });
      };

      return (
        <CategoryPostCard
          key={_id}
          likes={likes}
          isComment={true}
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
            title="나의 고민들"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
          <CategoryButton
            title="나의 위로들"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
            categoryStyle={styles.thudamCategory}
          />
        </View>
        <ScrollView styles={styles.postsWrapper}>
          {activeCategory === "나의 고민들" ?
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
    flexDirection: "row"
  },
  postStyle: {
    height: 520,
    backgroundColor: "rgba(0, 0, 0, 0)",
    fontSize: 30
  }
});

export default MyPostStorage;
