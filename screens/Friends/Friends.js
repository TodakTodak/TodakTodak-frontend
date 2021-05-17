import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import FriendCard from "../../components/FriendCard/FriendCard";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import {
  userSlice,
  fetchMyFriends,
  fetchWaitingFriends,
} from "../../redux/userSlice";

import backgroundImage from "../../assets/pngs/background.png";

function Friends({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("나의 인연들");

  const {
    email,
    isLoading,
    friendList,
    errorMessage,
    waitingFriendList,
    isFetchedFriendList,
    isFetchedWaitingFriendList
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userSlice.actions.resetFetchedStatus);

    const unSubscribe = navigation.addListener("focus", () => {
      if (activeCategory === "나의 인연들") {
        dispatch(fetchMyFriends(email));
      }

      if (activeCategory === "요청한 인연들") {
        dispatch(fetchWaitingFriends(email));
      }
    });

    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    if (activeCategory === "나의 인연들" && !isFetchedFriendList) {
      dispatch(fetchMyFriends(email));
    }

    if (activeCategory === "요청한 인연들" && !isFetchedWaitingFriendList) {
      dispatch(fetchWaitingFriends(email));
    }
  }, [activeCategory]);

  const renderFriends = () => {
    if (activeCategory === "나의 인연들") {
      return friendList.map((friend, index) =>
        <FriendCard
          key={index}
          friend={friend}
        />
      );
    }

    return waitingFriendList.map((friend, index) =>
      <FriendCard
        key={index}
        friend={friend}
      />
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
            <View style={{ height: 400 }} />
          </ScrollView>
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  friendsContainer: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  categoryWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  },
  activeCategoryBackground: {
    backgroundColor: "rgba(255, 56, 56, 0.3)"
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  }
});

export default Friends;
