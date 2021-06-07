import React, { useCallback } from "react";
import {
  View,
  ImageBackground
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import MyPosts from "./MyPosts/MyPosts";
import MyComments from "./MyComments/MyComments";
import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import AlertModal from "../../components/AlertModal/AlertModal";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import useActiveCategory from "../../hooks/useActiveCategory";

import {
  userSlice,
  fetchMyPosts,
  fetchMyComments
} from "../../redux/userSlice";

import styles from "./styles";

import {
  MY_POSTS,
  MY_COMMENTS
} from "../../constants/category";
import backgroundImage from "../../assets/pngs/background.png";

const MyPostStorage = () => {
  const dispatch = useDispatch();
  const {
    message,
    isLoading
  } = useSelector((state) => state.user);

  const categoryInfo = {
    [MY_POSTS]: fetchMyPosts,
    [MY_COMMENTS]: fetchMyComments
  };

  const [activeCategory, setActiveCategory] = useActiveCategory(MY_POSTS, categoryInfo);

  const clearMessage = useCallback(() => {
    dispatch(userSlice.actions.clearMessage());
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title text="고민 저장소" />
        <View style={styles.categorysWrapper}>
          <CategoryButton
            title="나의 고민들"
            categoryInfo={categoryInfo}
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
          <CategoryButton
            title="나의 위로들"
            categoryInfo={categoryInfo}
            focusValue={activeCategory}
            handleClick={setActiveCategory}
            categoryStyle={styles.thudamCategory}
          />
        </View>
        {isLoading
          ? <View style={styles.loadingWrapper}>
              <Loading style={styles.loading} />
            </View>
          : <>
              {activeCategory === "나의 고민들"
                ? <MyPosts />
                : <MyComments />
              }
            </>
        }
      </View>
      {message &&
        <AlertModal
          message={message}
          handleModalClose={clearMessage}
        />
      }
    </ImageBackground>
  );
}

export default React.memo(MyPostStorage);
