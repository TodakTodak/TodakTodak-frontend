import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  Text
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import PostCard from "../../components/PostCard/PostCard";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import { getMyPosts } from "../../api/postApi";
import { getMyComments } from "../../api/commentApi";

import backgroundImage from "../../assets/pngs/background.png";

function MyPostStorage({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState("나의 고민들");
  const [] = useState("");

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
        likes,
        title,
        category,
        createdAt
      } = post;

      const handlePostClick = () => (
        navigation.navigate("DetailPost", { postId: _id })
      );

      return (
        <PostCard
          key={_id}
          handleClick={handlePostClick}
        >
          <View style={styles.postContainer}>
            <View>
              <Text style={styles.postTitle}>
                {title}
              </Text>
              <Text style={styles.postContent}>
                {category} / {createdAt.substring(0, 10)}
              </Text>
            </View>
            <View style={styles.likeWrapper}>
              <AntDesign
                style={styles.likeIcon}
                size={15}
                color="red"
                name="heart"
              />
              <Text style={styles.postContent}>
                {likes.length}
              </Text>
            </View>
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
          <View style={styles.postContainer}>
            <View>
              <Text style={styles.postTitle}>
                {content.substring(0, 8)}
              </Text>
              <Text style={styles.postContent}>
                {createdAt.substring(0, 10)}
              </Text>
            </View>
            <View style={styles.likeWrapper}>
              <AntDesign
                style={styles.likeIcon}
                size={15}
                color="red"
                name="heart"
              />
              <Text style={styles.postContent}>
                {likes.length}
              </Text>
            </View>
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
  postContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  postTitle: {
    margin: 10,
    color: "#9e0031",
    fontSize: 17,
    fontWeight: "bold"
  },
  postContent: {
    margin: 10,
    color: "#000000",
    fontSize: 15,
    fontWeight: "600"
  },
  likeWrapper: {
    flexDirection: "row"
  },
  likeIcon: {
    paddingTop: 11
  }
});

export default MyPostStorage;
