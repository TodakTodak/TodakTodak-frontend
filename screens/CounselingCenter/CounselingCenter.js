import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import AlertModal from "../../components/AlertModal/AlertModal";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import CategoryPostCard from "../../components/CategoryPostCard/CategoryPostCard";
import CategoryPosts from "./CategoryPosts/CategoryPosts";

import {
  fetchLovePosts,
  fetchPainPosts,
  fetchCoursePosts,
  fetchFriendPosts,
  fetchEmploymentPosts,
  categoryPostSlice
} from "../../redux/categoryPostSlice";

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

const CounselingCenter = () => {
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
      dispatchCategoryInfo(categoryInfo);
    }
  }, [postCategory]);

  const dispatchCategoryInfo = (data) => {
    switch (data.category) {
      case EMPLOYMENT:
        dispatch(fetchEmploymentPosts(data));
        break;

      case LOVE:
        dispatch(fetchLovePosts(data));
        break;

      case COURSE:
        dispatch(fetchCoursePosts(data));
        break;

      case FRIEND:
        dispatch(fetchFriendPosts(data));
        break;

      case PAIN:
        dispatch(fetchPainPosts(data));
        break;

      default:
        break;
    }
  };

  const getCategorys = () => {
    const categoryInfo = {
      page,
      category: postCategory
    };

    dispatchCategoryInfo(categoryInfo);
    setPage((page) => page + 1);
  };

  const refreshCategory = () => {
    const categoryInfo = {
      page: 0,
      category: postCategory
    };

    setPage(1);
    dispatch(categoryPostSlice.actions.resetPostState());
    dispatchCategoryInfo(categoryInfo);
  };

  const renderCategoryPosts = ({ item }) => {
    const handlePostClick = () => (
      navigation.navigate(DETAIL_POST, { postId: item._id })
    );

    return (
      <CategoryPostCard
        key={item._id}
        postInfo={item}
        handleClick={handlePostClick}
      />
    );
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
    navigation.navigate(DETAIL_POST, {
      postId: bestPost[postCategory]._id
    });
  };

  const clearErrorMessage = () => {
    dispatch(categoryPostSlice.actions.clearMessage());
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
        <View style={styles.categoryWrapper}>
          {renderCategorys()}
        </View>
        {isLoading && !isFetched[postCategory]
          ? <View style={styles.loadingWrapper}>
              <Loading style={styles.loading} />
            </View>
          : <>
              <View style={styles.bestPost}>
                <Text style={styles.bestText}>
                  {postCategory} 카테고리 위로를 많이 받은 고민
                </Text>
                {bestPost[postCategory] &&
                  <CategoryPostCard
                    cardStyle={styles.bestPostCard}
                    postInfo={bestPost[postCategory]}
                    titleStyle={styles.bestPostTitle}
                    handleClick={handleBestPostClick}
                  />
                }
              </View>
              <CategoryPosts
                post={post}
                category={postCategory}
                getCategorys={getCategorys}
                refreshCategory={refreshCategory}
                renderCategoryPosts={renderCategoryPosts}
              />
            </>
        }
      </View>
      {message &&
        <AlertModal
          message={message}
          handleModalClose={clearErrorMessage}
        />
      }
    </ImageBackground>
  );
}

export default CounselingCenter;
