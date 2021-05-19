import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import styles from "./styles";

import MyPosts from "./MyPosts/MyPosts";
import MyComments from "./MyComments/MyComments";
import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import AlertModal from "../../components/AlertModal/AlertModal";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import {
  userSlice,
  fetchMyPosts,
  fetchMyComments
} from "../../redux/userSlice";

import backgroundImage from "../../assets/pngs/background.png";

function MyPostStorage() {
  const [activeCategory, setActiveCategory] = useState("나의 고민들");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    email,
    message,
    isLoading,
    accessToken
  } = useSelector((state) => state.user);

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      setActiveCategory("나의 고민들");
      dispatch(fetchMyPosts(accessToken));
    });

    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    if (activeCategory === "나의 고민들") {
      dispatch(fetchMyPosts(accessToken));
    }
    if (activeCategory === "나의 위로들") {
      dispatch(fetchMyComments(accessToken));
    }
  }, [activeCategory]);

  const clearMessage = () => {
    dispatch(userSlice.actions.clearMessage());
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
        {isLoading
          ? <View style={styles.loadingWrapper}>
              <Loading style={styles.loading} />
            </View>
          : <ScrollView styles={styles.postsWrapper}>
              {activeCategory === "나의 고민들"
                ? <MyPosts />
                : <MyComments />
              }
            </ScrollView>
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

export default MyPostStorage;
