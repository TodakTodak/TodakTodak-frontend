import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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

import styles from "./styles";

import {
  MY_FRIENDS,
  WAITING_FRIENDS,
  NOT_EXIST_FRIEND,
  NOT_EXIST_WAITING_FRIEND
} from "../../constants/friendStatus";

import backgroundImage from "../../assets/pngs/background.png";

const Friends = () => {
  const [activeCategory, setActiveCategory] = useState(MY_FRIENDS);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    friendList,
    accessToken,
    errorMessage,
    waitingFriendList
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userSlice.actions.resetFriendFetchedStatus());

    const unSubscribe = navigation.addListener("focus", () => {
      if (activeCategory === MY_FRIENDS) {
        dispatch(fetchMyFriends(accessToken));
      }

      if (activeCategory === WAITING_FRIENDS) {
        dispatch(fetchWaitingFriends(accessToken));
      }
    });

    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    if (activeCategory === MY_FRIENDS) {
      dispatch(fetchMyFriends(accessToken));
    }

    if (activeCategory === WAITING_FRIENDS) {
      dispatch(fetchWaitingFriends(accessToken));
    }
  }, [activeCategory]);

  const clearMessage = () => {
    dispatch(userSlice.actions.clearMessage());
  };

  const renderFriends = () => {
    if (activeCategory === MY_FRIENDS) {
      if (!friendList.length) {
        return <EmptyView text={NOT_EXIST_FRIEND} />;
      }

      return friendList.map((friend, index) =>
        <FriendCard key={index} friend={friend} />
      );
    }

    if (!waitingFriendList.length) {
      return <EmptyView text={NOT_EXIST_WAITING_FRIEND} />;
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
        <Title text={MY_FRIENDS} imageStyle={styles.titleImage} />
        <View style={styles.categoryWrapper}>
          <CategoryButton
            title={MY_FRIENDS}
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
          <CategoryButton
            title={WAITING_FRIENDS}
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
        </View>
        <ScrollView styles={styles.friendsContainer}>
          {renderFriends()}
          <View style={{ height: 200 }} />
        </ScrollView>
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
