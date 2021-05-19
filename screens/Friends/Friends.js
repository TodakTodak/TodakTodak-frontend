import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import EmptyView from "../../components/EmptyView/EmptyView";
import AlertModal from "../../components/AlertModal/AlertModal";
import FriendCard from "../../components/FriendCard/FriendCard";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import {
  userSlice,
  fetchMyFriends,
  fetchWaitingFriends
} from "../../redux/userSlice";

import backgroundImage from "../../assets/pngs/background.png";

function Friends() {
  const [activeCategory, setActiveCategory] = useState("나의 인연들");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    isLoading,
    friendList,
    accessToken,
    errorMessage,
    waitingFriendList
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userSlice.actions.resetFriendFetchedStatus());

    const unSubscribe = navigation.addListener("focus", () => {
      if (activeCategory === "나의 인연들") {
        dispatch(fetchMyFriends(accessToken));
      }

      if (activeCategory === "요청한 인연들") {
        dispatch(fetchWaitingFriends(accessToken));
      }
    });

    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    if (activeCategory === "나의 인연들") {
      dispatch(fetchMyFriends(accessToken));
    }

    if (activeCategory === "요청한 인연들") {
      dispatch(fetchWaitingFriends(accessToken));
    }
  }, [activeCategory]);

  const clearMessage = () => {
    dispatch(userSlice.actions.clearMessage());
  };

  const renderFriends = () => {
    if (activeCategory === "나의 인연들") {
      if (!friendList.length) {
        return <EmptyView text="아직 인연들이 없습니다." />;
      }

      return friendList.map((friend, index) =>
        <FriendCard key={index} friend={friend} />
      );
    }

    if (!waitingFriendList.length) {
      return <EmptyView text="요청 인연들이 없습니다." />;
    }

    return waitingFriendList.map((friend, index) =>
      <FriendCard key={index} friend={friend} />
    );
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title text="나의 인연들" imageStyle={styles.titleImage} />
        <View style={styles.categoryWrapper}>
          <CategoryButton
            title="나의 인연들"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
          <CategoryButton
            title="요청한 인연들"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
        </View>
        {isLoading ?
          <View style={styles.loadingWrapper}>
            <Loading style={styles.loading} />
          </View> :
          <ScrollView styles={styles.friendsContainer}>
            {renderFriends()}
            <View style={{ height: 200 }} />
          </ScrollView>
        }
      </View>
      {errorMessage &&
        <AlertModal
          message={errorMessage}
          handleModalClose={clearMessage}
        />
      }
    </ImageBackground>
  );
}

export default Friends;
