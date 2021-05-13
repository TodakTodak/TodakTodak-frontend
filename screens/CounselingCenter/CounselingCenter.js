import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
  Text
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title/Title";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";

import { getCategoryPosts } from "../../api/postApi";

import backgroundImage from "../../assets/pngs/background.png";
import { NANUM_REGULAR } from "../../constants/font";

function CounselingCenter() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [bestPost, setBestPost] = useState(null);
  const [postCategory, setpostCategory] = useState("취업");
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useSelector((state) => state.userReducer);
  const navigation = useNavigation();

  const categorys = [
    { title: "취업", color: "rgba(255, 56, 56, 0.3)" },
    { title: "사랑", color: "rgba(249, 157, 20, 0.3)" },
    { title: "진로", color: "rgba(239, 255, 56, 0.3)" },
    { title: "친구", color: "rgba(120, 255, 56, 0.3)" },
    { title: "고통", color: "rgba(56, 136, 255, 0.3)" }
  ];

  useEffect(() => {
    setPage(0);
    getCategorys();
  }, [postCategory]);

  async function getCategorys(page = 0) {
    try {
      const {
        errorMessage,
        categoryPosts,
        highestLikesPost
      } = await getCategoryPosts(postCategory, page);

      if (errorMessage) {
        setErrorMessage(errorMessage);
        return;
      }

      if (!page) {
        setPosts(categoryPosts);
        setBestPost(highestLikesPost);
      } else {
        setPosts([ ...posts, ...categoryPosts ]);
      }

      setPage((page) => page + 1);
    } catch (err) {
      console.log(err.message, "에러 터짐");

      setErrorMessage("포스트를 가져오는데 실패했습니다");
    }
  }

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

  const handleBestPostClick = () => {
    navigation.navigate("DetailPost", { postId: bestPost._id });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title
          text="고민 상담소"
          textStyle={styles.titleText}
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
              likes={bestPost.likes}
              createdAt={bestPost.createdAt}
              cardStyle={styles.bestPostCard}
              handleClick={handleBestPostClick}
              isAnonymous={bestPost.isAnonymous}
              ownerNickname={bestPost.ownerNickname}
            />
          }
        </View>
        <FlatList
          onEndReached={() => getCategorys(page)}
        onEndReachedThreshold={0.9}
          keyExtractor={(item) => item._id}
          styles={styles.postsWrapper}
          data={posts}
          renderItem={({ item }) => {
            const {
              _id,
              likes,
              title,
              createdAt,
              isAnonymous,
              ownerNickname,
            } = item;

            const handlePostClick = () => (
              navigation.navigate("DetailPost", { postId: _id })
            );

            return (
              <CategoryPostCard
                key={_id}
                likes={likes}
                title={title}
                createdAt={createdAt}
                isAnonymous={isAnonymous}
                handleClick={handlePostClick}
                ownerNickname={ownerNickname}
              />
            );
          }}
        />
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
    fontSize: 40
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-45%",
    left: "27%"
  },
  categoryWrapper: {
    minHeight: 60,
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
    marginTop: 10,
    marginBottom: 30
  },
  bestPost: {
    width: "100%",
    maxHeight: 200,
    alignItems: "center",
    borderColor: "#ffffff",
    borderBottomWidth: 3
  },
  bestTitle: {
    height: 30,
    color: "rgb(235, 255, 0)",
    fontWeight: "bold",
    fontFamily: NANUM_REGULAR,
    fontSize: 20
  }
});

export default CounselingCenter;
