import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import FriendCard from "../../components/FriendCard/FriendCard";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import {
  getFriends,
  getWaitingFriends
} from "../../api/userApi";

import backgroundImage from "../../assets/pngs/background.png";

function Friends() {
  const [friendList, setFriendList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("나의 인연들");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (activeCategory === "나의 인연들") {
      (async function getMyFrineds() {
        try {
          const response = await getFriends(user.email);

          if (response.errorMessage) {
            return console.log("에러");
          }

          setFriendList(response.friends);
        } catch (err) {
          console.log(err.message);
          console.log("에러발생");

          setErrorMessage("친구 목록을 가져오는데 실패했습니다.");
        }
      })();
    }

    if (activeCategory === "요청한 인연들") {
      (async function getMyWaitingFriends() {
        try {
          const response = await getWaitingFriends(user.email);

          if (response.errorMessage) {
            return console.log("에러");
          }

          setFriendList(response.friends);
        } catch (err) {
          console.log(err.message);
          console.log("에러 발생");

          setErrorMessage("친구 목록을 가져오는데 실패했습니다");
        }
      })();
    }
  }, [activeCategory]);

  const renderFriends = () => {
    return friendList.map((friend, index) =>
      <FriendCard
        key={index}
        friendInfo={friend} user={user}
      />
    )};

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
        <ScrollView styles={styles.friendsContainer}>
          {renderFriends()}
          <View style={{ height: 400 }} />
        </ScrollView>
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
  }
});

export default Friends;
