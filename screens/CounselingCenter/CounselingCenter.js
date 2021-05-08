import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View
} from "react-native";

import Title from "../../components/Title/Title";
import Category from "../../components/Category/Category";
import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";

import { getCategoryPosts } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";

function CounselingCenter() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("진로");
  const [errorMessage, setErrorMessage] = useState("");

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
        const { categoryPosts, errorMessage } = await getCategoryPosts(category);

        if (errorMessage) {
          setErrorMessage(errorMessage);
          return;
        }

        setPosts(categoryPosts);
      } catch (err) {
        console.log("에러발생");

        setErrorMessage("포스트를 가져오는데 실패했습니다");
      }
    })();
  }, [category]);

  const renderCategorys = () => {
    return categorys.map((category) =>
      <Category
        key={category.title}
        title={category.title}
        categoryColor={category.color}
        categoryContainerStyle={styles.catagoryContainer}
        categoryStyle={styles.categoryStyle}
        bottomBarStyle={styles.bottomBarStyle}
      />
    );
  };

  const renderCategoryPosts = () => {
    return posts.map((post) => {
      const {
        _id,
        title,
        comments,
        createdAt,
        isAnonymous,
        ownerNickname,
      } = post;

      return (
        <CategoryPostCard
          key={_id}
          title={title}
          comments={comments}
          createdAt={createdAt}
          isAnonymous={isAnonymous}
          ownerNickname={ownerNickname}
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
        <Title text="고민 상담소"
          textStyle={styles.title}
          imageStyle={styles.titleImage}
        />
        <ScrollView style={styles.categoryWrapper} horizontal={true}>
          {renderCategorys()}
        </ScrollView>
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
    marginLeft: "auto",
    marginTop: 40
  }
});

export default CounselingCenter;
