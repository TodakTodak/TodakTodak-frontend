import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  View,
  Text
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import Loading from "../../screens/Loading/Loading";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";

import {
  fetchEmploymentPosts,
  fetchCoursePosts,
  fetchFriendPosts,
  fetchLovePosts,
  fetchPainPosts,
} from "../../redux/categoryPostSlice";

import { categoryPostSlice } from "../../redux/categoryPostSlice";

import emptyBox from "../../assets/pngs/emptyBox.png";
import backgroundImage from "../../assets/pngs/background.png";

function CounselingCenter({ navigation }) {
  const [page, setPage] = useState(1);
  const [postCategory, setPostCategory] = useState("취업");

  const {
    post,
    message,
    bestPost,
    isLoading,
    isFetched
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const categorys = [
    { title: "취업", color: "rgba(56, 136, 255, 0.3)" },
    { title: "사랑", color: "rgba(249, 157, 20, 0.3)" },
    { title: "진로", color: "rgba(239, 255, 56, 0.3)" },
    { title: "친구", color: "rgba(120, 255, 56, 0.3)" },
    { title: "고통", color: "rgba(255, 56, 56, 0.3)" }
  ];

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus" , () => {
      setPostCategory("취업");
      const initialCategoryInfo = {
        category: "취업",
        page: 0
      };

      setPage(1);
      dispatch(categoryPostSlice.actions.resetPostState());
      dispatch(fetchEmploymentPosts(initialCategoryInfo));
    });

    return unSubscribe;
  }, []);

  useEffect(() => {
    const categoryInfo = {
      category: postCategory,
      page: 0
    };

    if (!isFetched[postCategory]) {
      switch (postCategory) {
        case "사랑":
          dispatch(fetchLovePosts(categoryInfo));
          break;

        case "진로":
          dispatch(fetchCoursePosts(categoryInfo));
          break;

        case "친구":
          dispatch(fetchFriendPosts(categoryInfo));
          break;

        case "고통":
          dispatch(fetchPainPosts(categoryInfo));
          break;

        default:
          break;
      }
    }
  }, [postCategory]);

  const getCategorys = () => {
    const categoryInfo = {
      category: postCategory,
      page,
    };

    switch (postCategory) {
      case "취업":
        dispatch(fetchEmploymentPosts(categoryInfo));
        break;

      case "사랑":
        dispatch(fetchLovePosts(categoryInfo));
        break;

      case "진로":
        dispatch(fetchCoursePosts(categoryInfo));
        break;

      case "친구":
        dispatch(fetchFriendPosts(categoryInfo));
        break;

      case "고통":
        dispatch(fetchPainPosts(categoryInfo));
        break;

      default:
        break;
    }

    setPage((page) => page + 1);
  };

  const renderCategorys = () => {
    return categorys.map((category) =>
      <CategoryButton
        key={category.title}
        title={category.title}
        focusValue={postCategory}
        handleClick={setPostCategory}
        categoryColor={category.color}
        categoryStyle={styles.categoryStyle}
        categoryContainerStyle={styles.catagoryContainer}
      />
    );
  };

  const handleBestPostClick = () => {
    navigation.navigate("DetailPost", { postId: bestPost[postCategory]._id });
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
        <View
          style={styles.categoryWrapper}
          horizontal={true}
        >
          {renderCategorys()}
        </View>
        {isLoading && !isFetched[postCategory] ?
          <View style={styles.loadingWrapper}>
            <Loading style={styles.loading} />
          </View> :
          <>
            <View style={styles.bestPost}>
              <Text style={styles.bestTitle}>
                {postCategory} 카테고리 위로를 많이 받은 고민
              </Text>
              {bestPost[postCategory] &&
                <CategoryPostCard
                  cardStyle={styles.bestPostCard}
                  handleClick={handleBestPostClick}
                  title={bestPost[postCategory].title}
                  likes={bestPost[postCategory].likes}
                  createdAt={bestPost[postCategory].createdAt}
                  isAnonymous={bestPost[postCategory].isAnonymous}
                  ownerNickname={bestPost[postCategory].ownerNickname}
                />
              }
            </View>
            {0 < post[postCategory].length ?
              <FlatList
                refreshControl={
                  <RefreshControl
                    onRefresh={() => {
                      setPostCategory(postCategory);
                      const initialCategoryInfo = {
                        category: postCategory,
                        page: 0
                      };

                      setPage(1);
                      dispatch(categoryPostSlice.actions.resetPostState());
                      dispatch(fetchEmploymentPosts(initialCategoryInfo));
                    }}
                  />
                }
                onEndReached={getCategorys}
                onEndReachedThreshold={0.9}
                keyExtractor={(item) => item._id}
                styles={styles.postsWrapper}
                data={post[postCategory]}
                renderItem={({ item }) => {
                  const {
                    _id,
                    likes,
                    title,
                    createdAt,
                    isAnonymous,
                    ownerNickname
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
              /> :
              <ScrollView
                contentContainerStyle={styles.emptyContainer}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => {
                      setPostCategory(postCategory);
                      const initialCategoryInfo = {
                        category: postCategory,
                        page: 0
                      };

                      setPage(1);
                      dispatch(categoryPostSlice.actions.resetPostState());
                      dispatch(fetchEmploymentPosts(initialCategoryInfo));
                    }}
                  />
                }
              >
                <Image source={emptyBox} style={styles.emptyBoxImage} />
                <Text style={styles.emptyText}>
                  해당 카테고리의 고민이 없습니다.
                </Text>
              </ScrollView>
            }
          </>
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
  categoryWrapper: {
    minHeight: 60,
    maxHeight: 60,
    flexDirection: "row",
    marginTop: 30
  },
  catagoryContainer: {
    width: "20%"
  },
  categoryStyle: {
    width: "90%"
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
    borderColor: "yellow",
    borderWidth: 1
  },
  bestPost: {
    width: "100%",
    maxHeight: 200,
    alignItems: "center"
  },
  bestTitle: {
    height: 30,
    color: "rgb(235, 255, 0)",
    fontWeight: "bold",
    fontSize: 20
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  emptyContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 100
  },
  emptyBoxImage: {
    width: 100,
    height: 100
  },
  emptyText: {
    marginTop: 20,
    color: "#ffffff",
    fontSize: 20
  }
});

export default CounselingCenter;
