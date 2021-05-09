import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  View
} from "react-native";
import { useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import Category from "../../components/Category/Category";
import PostCard from "../../components/PostCard/PostCard";

import { getMyPosts } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";

function MyPostStorage({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
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
  }, []);

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

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title
          text="고민 저장소"
          textStyle={styles.title}
          imageStyle={styles.titleImage}
        />
        <View style={styles.categorysWrapper}>
          <Category title="토닥 토닥" />
          <Category title="쓰담 쓰담" categoryStyle={styles.thudamCategory} />
        </View>
        <ScrollView styles={styles.postsWrapper}>
          {renderMyPosts()}
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
  title: {
    height: 50,
    fontSize: 30
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-60%",
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
  }
});

export default MyPostStorage;
