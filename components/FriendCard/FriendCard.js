import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native"

import Button from "../../components/Button/Button";

import {
  patchPendingFriend,
  rejectPendingFriend
} from "../../api/userApi";

import avatar from "../../assets/pngs/avatar.png";

function FriendCard({ friend, user }) {
  const [friendStatus, setFriendStatus] = useState("");
  const navigation = useNavigation();

  const { friendInfo, chatRoomId, status } = friend;

  useEffect(() => {
    switch (status) {
      case "SendPending":
        setFriendStatus("대기 중");
        break;

      case "ReceivePending":
        setFriendStatus("수락 여부 체크");
        break;

      case "ReceiveReject":
        setFriendStatus("친구 거절");
        break;

      default:
        setFriendStatus("친구");
        break;
    }
  }, [friend]);

  const handleEnterChatRoomClick = () => {
    navigation.navigate("ChatRoom", {
      userNickname: user.nickname,
      chatRoomId
    });
  };

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
      key={friendInfo.nickname}
      style={styles.friend}
    >
      <View style={styles.friendInfoWrapper}>
        <Image source={avatar} style={styles.friendAvatar} />
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>
            {friendStatus === "대기 중:" ? "요청 친구:" : ""}{" "}
            {friendInfo.nickname}
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
            buttonStyle={styles.friendButton}
            handleClick={() => acceptFriend(friendInfo.email)}
          />
          <Button
            text="거절"
            textStyle={styles.buttonText}
            buttonStyle={styles.friendButton}
            handleClick={() => rejectFriend(friendInfo.email)}
          />
        </View>
      }
      {friendStatus === "친구 거절" &&
        <View style={styles.buttons}>
          <Button
            text="삭제"
            buttonStyle={styles.friendButton}
            textStyle={styles.buttonText}
            handleClick={() => rejectFriend(friendInfo.email)}
          />
        </View>
      }
      {friendStatus === "친구" &&
        <View style={styles.buttons}>
          <Button
            text="채팅하기"
            buttonStyle={styles.friendButton}
            textStyle={styles.buttonText}
            handleClick={handleEnterChatRoomClick}
          />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    width: "90%",
    height: "10%",
    maxHeight: "15%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    marginLeft: 20,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  friendInfoWrapper: {
    width: "60%",
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  friendInfo: {
    justifyContent: "center"
  },
  friendAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "yellow",
    marginRight: 10
  },
  friendName: {
    fontSize: 20
  },
  friendStatusText: {
    color: "coral",
    fontSize: 15
  },
  buttons: {
    width: "50%",
    flexDirection: "row"
  },
  friendButton: {
    width: "20%",
    minWidth: "20%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  buttonText: {
    fontSize: 15,
    color: "#000000"
  }
});

export default FriendCard;
