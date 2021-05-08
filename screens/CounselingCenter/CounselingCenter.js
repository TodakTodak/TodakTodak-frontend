import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text
} from "react-native";
import { useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";

import { getCategoryPosts } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";

function CounselingCenter({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [bestPost, setBestPost] = useState(null);
  const [postCategory, setpostCategory] = useState("취업");
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useSelector((state) => state.userReducer);

  const categorys = [
    { title: "취업", color: "rgba(255, 56, 56, 0.3)" },
    { title: "사랑", color: "rgba(249, 157, 20, 0.3)" },
    { title: "진로", color: "rgba(239, 255, 56, 0.3)" },
    { title: "친구", color: "rgba(120, 255, 56, 0.3)" },
    { title: "고통", color: "rgba(56, 136, 255, 0.3)" }
  ];

  useEffect(() => {
    (async function getCategorys() {
      try {
        const {
          errorMessage,
          categoryPosts,
          highestLikesPost
        } = await getCategoryPosts(postCategory);

        if (errorMessage) {
          setErrorMessage(errorMessage);
          return;
        }

        setPosts(categoryPosts);
        setBestPost(highestLikesPost);
      } catch (err) {
        console.log("에러발생");

        setErrorMessage("포스트를 가져오는데 실패했습니다");
      }
    })();
  }, [postCategory]);

  const renderCategorys = () => {
    return categorys.map((category) =>
      <CategoryButton
        key={category.title}
        title={category.title}
        focusValue={postCategory}
        handleClick={setpostCategory}
        categoryColor={category.color}
        categoryStyle={styles.categoryStyle}
        bottomBarStyle={styles.bottomBarStyle}
        categoryContainerStyle={styles.catagoryContainer}
      />
    );
  };

  const renderCategoryPosts = () => {
    return posts.map((post) => {
      const {
        _id,
        title,
        comments,
        contents,
        createdAt,
        isAnonymous,
        ownerNickname,
      } = post;

      const handlePostClick = () => {
        navigation.navigate("DetailPost", {
          contents,
          category: postCategory,
          userId: currentUser.email,
          inputStyle: styles.postStyle,
          postOwner: isAnonymous ? "익명" : ownerNickname,
        });
      };

      return (
        <CategoryPostCard
          key={_id}
          title={title}
          comments={comments}
          createdAt={createdAt}
          isAnonymous={isAnonymous}
          handleClick={handlePostClick}
          ownerNickname={ownerNickname}
        />
      );
    });
  };

  const handleBestPostClick = () => {
    navigation.navigate("DetailPost", {
      category: postCategory,
      userId: currentUser.email,
      contents: bestPost.contents,
      inputStyle: styles.postStyle,
      postOwner: bestPost.isAnonymous ? "익명" : bestPost.ownerNickname
    });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title
          text="고민 상담소"
          textStyle={styles.title}
          imageStyle={styles.titleImage}
        />
        <ScrollView
          style={styles.categoryWrapper}
          horizontal={true}
        >
          {renderCategorys()}
        </ScrollView>
        <View style={styles.bestPost}>
          <Text style={styles.bestTitle}>
            {postCategory} 토닥토닥을 많이 받은 고민
          </Text>
          {bestPost &&
            <CategoryPostCard
              title={bestPost.title}
              comments={bestPost.comments}
              createdAt={bestPost.createdAt}
              cardStyle={styles.bestPostCard}
              handleClick={handleBestPostClick}
              isAnonymous={bestPost.isAnonymous}
              ownerNickname={bestPost.ownerNickname}
            />
          }
        </View>
        <ScrollView styles={styles.postsWrapper}>
          {renderCategoryPosts()}
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
    top: "-55%",
    left: "27%"
  },
  categoryWrapper: {
    maxHeight: 60,
    flexDirection: "row",
    marginTop: 30
  },
  catagoryContainer: {
    width: "20%",
    margin: 1
  },
  categoryStyle: {
    width: "90%"
  },
  bottomBarStyle: {
    width: 90
  },
  postsWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto"
  },
  bestPostCard: {
    marginBottom: 30
  },
  bestPost: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffffff",
    borderBottomWidth: 3,
  },
  bestTitle: {
    color: "rgb(235, 255, 0)",
    fontWeight: "bold"
  },
  postStyle: {
    height: 200
  }
});

export default CounselingCenter;