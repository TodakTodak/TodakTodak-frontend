import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground
} from "react-native";
import { useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import {
  getFriends,
  getWaitingFriends,
  patchPendingFriend
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

    if (activeCategory === "맺혀질 인연들") {
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

  const handlePendingButtonClick = async (friendEmail) => {
    const friendInfo = {
      friendEmail,
      user: user.email
    };

    try {
      const response = await patchPendingFriend(friendInfo);

      console.log(response);
    } catch (err) {
      console.log(err.message, "에러 터짐");

      setErrorMessage("요청에 실패했습니다");
    }
  };

  const renderFriends = () => {
    return friendList.map((friend) => {
      let friendStatus = "친구";

      if (friend.status) {
        switch (friend.status) {
          case "SendPending":
            friendStatus = "대기 중"
            break;

          case "ReceivePending":
            friendStatus = "수락 여부 체크"
            break;

          case "SendReject":
            friendStatus = "거부 했음"
            break;

          case "ReceiveReject":
            friendStatus = "거부 당함"
            break;

          default:
            break;
        }
      }

      return (
        <View
          key={friend.nickname ? friend.nickname : friend.userId.nickname}
          style={styles.friend}
        >
          <View style={styles.frinedInfo}>
            <Text>
              {friend.userId ? friend.userId.nickname : friend.nickname}
            </Text>
            <Text>{friendStatus}</Text>
          </View>
          {friendStatus === "수락 여부 체크" &&
            <View style={styles.buttons}>
              <Button
                text="수락"
                buttonStyle={styles.firendButton}
                textStyle={styles.buttonText}
                handleClick={() => handlePendingButtonClick(friend.userId.email)}
              />
              <Button
                text="거절"
                buttonStyle={styles.firendButton}
                textStyle={styles.buttonText}
              />
            </View>
          }
          {friendStatus === "친구" &&
            <View style={styles.buttons}>
              <Button
                text="채팅하기"
                buttonStyle={styles.firendButton}
                textStyle={styles.buttonText}
              />
            </View>
          }
        </View>
      );
    });
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
            title="맺혀질 인연들"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
            categoryStyle={styles.waitingFriendCategory}
          />
        </View>
        <View styles={styles.friendsContainer}>
          {renderFriends()}
        </View>
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
  friend: {
    width: "90%",
    minHeight: "10%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
    padding: 5,
    borderWidth: 3,
    borderRadius: 15,
    backgroundColor: "#ffffff"
  },
  frinedInfo: {
    width: "60%",
    marginLeft: 15
  },
  buttons: {
    flexDirection: "row"
  },
  firendButton: {
    minWidth: "30%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  buttonText: {
    fontSize: 20,
    color: "#000000"
  },
  categoryWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  },
  waitingFriendCategory: {
    backgroundColor: "rgba(239, 255, 56, 0.3)"
  }
});

export default Friends;
