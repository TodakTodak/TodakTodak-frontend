import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text
} from "react-native";

import Button from "../../components/Button/Button";

import {
  patchPendingFriend,
  rejectPendingFriend
} from "../../api/userApi";

import avatar from "../../assets/pngs/avatar.png";
import { NANUM_REGULAR } from "../../constants/font";

function FriendCard({ friendInfo, user }) {
  const [friendStatus, setFriendStatus] = useState("");

  useEffect(() => {
    switch (friendInfo.status) {
      case "SendPending":
        setFriendStatus("대기 중");
        break;

      case "ReceivePending":
        setFriendStatus("수락 여부 체크");
        break;

      default:
        setFriendStatus("친구");
        break;
    }
  }, [friendInfo]);

  const acceptFriend = async (friendEmail) => {
    const friendInfo = {
      friendEmail,
      user: user.email
    };

    try {
      const response = await patchPendingFriend(friendInfo);

      if (response.errorMessage) {
        console.log("에러발생");
        return;
      }

      setFriendStatus("수락");
    } catch (err) {
      console.log(err.message, "에러 터짐");

      setErrorMessage("요청에 실패했습니다");
    }
  };

  const rejectFriend = async (friendEmail) => {
    const friendInfo = {
      friendEmail,
      user: user.email
    };

    try {
      const response = await rejectPendingFriend(friendInfo);

      if (response.errorMessage) {
        console.log("에러 발생");
        return;
      }

      setFriendStatus("삭제 조치");
    } catch (err) {
      console.log(err.message, "에러 터짐");

      setErrorMessage("요청에 실패했습니다");
    }
  };

  return (
    <View
      key={friendInfo.nickname ? friendInfo.nickname : friendInfo.userId.nickname}
      style={styles.friend}
    >
      <View style={styles.friendInfoWrapper}>
        <Image source={avatar} style={styles.friendAvatar} />
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>
            {friendStatus === "대기 중" ? "요청 친구" : "나의 친구"}:{" "}
            {friendInfo.userId ? friendInfo.userId.nickname : friendInfo.nickname}
          </Text>
          {friendStatus !== "친구" &&
            <Text style={styles.friendStatusText}>{friendStatus}</Text>
          }
        </View>
      </View>
      {friendStatus === "수락 여부 체크" &&
        <View style={styles.buttons}>
          <Button
            text="수락"
            textStyle={styles.buttonText}
            buttonStyle={styles.firendButton}
            handleClick={() => acceptFriend(friendInfo.userId.email)}
          />
          <Button
            text="거절"
            textStyle={styles.buttonText}
            buttonStyle={styles.firendButton}
            handleClick={() => rejectFriend(friendInfo.userId.email)}
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
}

const styles = StyleSheet.create({
  friend: {
    width: "90%",
    minHeight: "10%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
  friendInfoWrapper: {
    width: "60%",
    marginLeft: 15,
    flexDirection: "row"
  },
  friendInfo: {
    justifyContent: "center"
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "yellow",
    marginRight: 10
  },
  friendName: {
    fontSize: 20,
    fontFamily: NANUM_REGULAR
  },
  friendStatusText: {
    color: "coral",
    fontSize: 20,
    fontFamily: NANUM_REGULAR
  },
  buttons: {
    flexDirection: "row"
  },
  firendButton: {
    width: "20%",
    minWidth: "20%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  buttonText: {
    fontSize: 20,
    color: "#000000"
  }
});

export default FriendCard;
