import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Button/Button";

import {
  rejectWaitingFriend,
  acceptWaitingFriend
} from "../../redux/userSlice";

import { CHATROOM } from "../../constants/navigationName";

import avatar from "../../assets/pngs/avatar.png";

function FriendCard({ friend }) {
  const [friendStatus, setFriendStatus] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
    navigation.navigate(CHATROOM, {
      userNickname: user.nickname,
      chatRoomId
    });
  };

  const acceptFriend = async (friendEmail) => {
    const friendInfo = {
      friendEmail,
      user: user.email
    };

    dispatch(acceptWaitingFriend(friendInfo));
  };

  const rejectFriend = async (friendEmail) => {
    const friendInfo = {
      friendEmail,
      user: user.email
    };

    dispatch(rejectWaitingFriend(friendInfo));
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
    minHeight: "20%",
    maxHeight: "15%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    marginLeft: 20,
    padding: 5,
    borderRadius: 10,
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
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "yellow",
    marginRight: 10
  },
  friendName: {
    fontSize: 15
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
