import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text
} from "react-native";

import { patchPendingFriend } from "../../api/userApi";

import Button from "../../components/Button/Button";

import avatar from "../../assets/pngs/avatar.png";

import { NANUM_REGULAR } from "../../constants/font";

function FriendCard({ friendInfo, user }) {
  const [friendStatus, setFriendStatus] = useState("친구");
  const [acceptText, setAcceptText] = useState("수락");

  useEffect(() => {
    switch (friendInfo.status) {
      case "SendPending":
        setFriendStatus("대기 중");
        break;

      case "ReceivePending":
        setFriendStatus("수락 여부 체크");
        break;

      case "SendReject":
        setFriendStatus("거부 했음");
        break;

      case "ReceiveReject":
        setFriendStatus("거부 당함");
        break;

      default:
        setFriendStatus("친구");
        break;
    }
  }, [friendInfo]);

  const acceptPendingFriend = async (friendEmail) => {
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

      setAcceptText("수락했습니다!");
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
            text={acceptText}
            textStyle={styles.buttonText}
            buttonStyle={styles.firendButton}
            disabled={acceptText === "수락" ? false : true}
            handleClick={() => acceptPendingFriend(friendInfo.userId.email)}
          />
          <Button
            text="거절"
            buttonStyle={styles.firendButton}
            textStyle={styles.buttonText}
            handleClick={() => handleRejectButtonClick(friendInfo.userId.email)}
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
    minWidth: "30%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  buttonText: {
    fontSize: 20,
    color: "#000000"
  }
});

export default FriendCard;
