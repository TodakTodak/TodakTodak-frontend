import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import EmptyView from "../../components/EmptyView/EmptyView";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";

import {
  fetchLovePosts,
  fetchPainPosts,
  fetchCoursePosts,
  fetchFriendPosts,
  fetchEmploymentPosts
} from "../../redux/categoryPostSlice";
import { categoryPostSlice } from "../../redux/categoryPostSlice";

import {
  PAIN,
  LOVE,
  COURSE,
  FRIEND,
  EMPLOYMENT
} from "../../constants/category";
import {
  LOVE_COLOR,
  PAIN_COLOR,
  FRIEND_COLOR,
  COURSE_COLOR,
  EMPLOYMENT_COLOR
} from "../../constants/color";
import { DETAIL_POST } from "../../constants/navigationName";

import backgroundImage from "../../assets/pngs/background.png";

function COUNSELING_CENTER() {
  const [page, setPage] = useState(1);
  const [postCategory, setPostCategory] = useState(EMPLOYMENT);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    post,
    message,
    bestPost,
    isLoading,
    isFetched
  } = useSelector((state) => state.post);

  const categorys = [
    { title: PAIN, color: PAIN_COLOR },
    { title: LOVE, color: LOVE_COLOR },
    { title: COURSE, color: COURSE_COLOR },
    { title: FRIEND, color: FRIEND_COLOR },
    { title: EMPLOYMENT, color: EMPLOYMENT_COLOR }
  ];

  useEffect(() => {
    const categoryInfo = {
      page: 0,
      category: postCategory
    };

    if (!isFetched[postCategory]) {
      dispatchCategoryInfo(postCategory, categoryInfo);
    }
  }, [postCategory]);

  const dispatchCategoryInfo = (category, info) => {
    switch (category) {
      case EMPLOYMENT:
        dispatch(fetchEmploymentPosts(info));
        break;

      case LOVE:
        dispatch(fetchLovePosts(info));
        break;

      case COURSE:
        dispatch(fetchCoursePosts(info));
        break;

      case FRIEND:
        dispatch(fetchFriendPosts(info));
        break;

      case PAIN:
        dispatch(fetchPainPosts(info));
        break;

      default:
        break;
    }
  };

  const getCategorys = () => {
    const categoryInfo = {
      category: postCategory,
      page
    };

    dispatchCategoryInfo(postCategory, categoryInfo);
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
    navigation.navigate(DETAIL_POST, { postId: bestPost[postCategory]._id });
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
              <Text style={styles.bestText}>
                {postCategory} 카테고리 위로를 많이 받은 고민
              </Text>
              {bestPost[postCategory] &&
                <CategoryPostCard
                  cardStyle={styles.bestPostCard}
                  titleStyle={styles.bestPostTitle}
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
                      const categoryInfo = {
                        category: postCategory,
                        page: 0
                      };

                      setPage(1);
                      dispatch(categoryPostSlice.actions.resetPostState());
                      dispatchCategoryInfo(postCategory, categoryInfo);
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
                    navigation.navigate(DETAIL_POST, { postId: _id })
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
                      const categoryInfo = {
                        category: postCategory,
                        page: 0
                      };

                      setPage(1);
                      dispatch(categoryPostSlice.actions.resetPostState());
                      dispatchCategoryInfo(postCategory, categoryInfo);
                    }}
                  />
                }
              >
                <EmptyView
                  text="해당 카테고리의 고민이 없습니다."
                  viewStyle={styles.emptyContainer}
                />
              </ScrollView>
            }
          </>
        }
      </View>
    </ImageBackground>
  );
}

export default COUNSELING_CENTER;
