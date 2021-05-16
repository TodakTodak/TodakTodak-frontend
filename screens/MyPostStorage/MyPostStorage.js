import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  Text
} from "react-native";
import { useSelector } from "react-redux";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import PostCard from "../../components/PostCard/PostCard";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import { getMyPosts, getMyComments } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";

function MyPostStorage({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState("나의 고민들");

  const user = useSelector((state) => state.user);

  useEffect(() => {
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
        } finally {
          setIsLoading(false);
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

          setComments(response.comments);
        } catch (err) {
          console.log("에러발생");

          setErrorMessage("포스트를 가져오는데 실패했습니다");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [activeCategory]);

  const renderMyPosts = () => {
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
          handleClick={handlePostClick}
        >
          <View>
            <Text style={styles.postContent}>
              고민 유형: {category}
            </Text>
            <Text style={styles.postContent}>
              고민 제목: {title}
            </Text>
          </View>
        </PostCard>
      );
    });
  };

  const renderMyComments = () => {
    return comments.map((comment) => {
      const {
        _id,
        post,
        likes,
        content,
        createdAt
      } = comment;

      const handleCommentClick = () => {
        navigation.navigate("Answer", {
          postId: post,
          commentInfo: comment
        });
      };

      return (
        <PostCard
          key={_id}
          handleClick={handleCommentClick}
        >
          <View>
            <Text style={styles.postContent}>
              답변: {content.substring(0, 8)}
            </Text>
            <Text style={styles.postContent}>
              추천 수: {likes.length} / {createdAt.substring(0, 10)}
            </Text>
          </View>
        </PostCard>
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
        {isLoading ?
          <View style={styles.loadingWrapper}>
            <Loading style={styles.loading} />
          </View> :
          <ScrollView styles={styles.postsWrapper}>
            {activeCategory === "나의 고민들" ?
              renderMyPosts() :
              renderMyComments()
            }
          </ScrollView>
        }
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
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  postContent: {
    margin: 10,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default MyPostStorage;
