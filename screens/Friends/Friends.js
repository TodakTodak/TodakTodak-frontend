import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import EmptyView from "../../components/EmptyView/EmptyView";
import FriendCard from "../../components/FriendCard/FriendCard";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import {
  userSlice,
  fetchMyFriends,
  fetchWaitingFriends
} from "../../redux/userSlice";

import { CATEGORY_ACTIVE_COLOR, TRANSPARENCY } from "../../constants/color";

import backgroundImage from "../../assets/pngs/background.png";

function Friends() {
  const [activeCategory, setActiveCategory] = useState("나의 인연들");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    email,
    isLoading,
    friendList,
    errorMessage,
    waitingFriendList,
    isFetchedFriendList,
    isFetchedWaitingFriendList
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userSlice.actions.resetFriendFetchedStatus());

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
      if (!friendList.length) {
        return <EmptyView text="아직 인연들이 없습니다." />;
      }

      return friendList.map((friend, index) =>
        <FriendCard
          key={index}
          friend={friend}
        />
      );
    }

    if (!waitingFriendList.length) {
      return <EmptyView text="요청 인연들이 없습니다." />;
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
            <View style={{ height: 200 }} />
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
    backgroundColor: CATEGORY_ACTIVE_COLOR
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: TRANSPARENCY
  }
});

export default Friends;
