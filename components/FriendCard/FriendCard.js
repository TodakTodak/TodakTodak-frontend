import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Button/Button";

import {
  rejectWaitingFriend,
  acceptWaitingFriend
} from "../../redux/userSlice";

import styles from "./styles";

import { CHAT_ROOM } from "../../constants/navigationName";

import avatar from "../../assets/pngs/avatar.png";

function FriendCard({ friend }) {
  const [friendStatus, setFriendStatus] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

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

  const handleEnterCHAT_ROOMClick = () => {
    navigation.navigate(CHAT_ROOM, {
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
            handleClick={handleEnterCHAT_ROOMClick}
          />
        </View>
      }
    </View>
  );
}

export default FriendCard;
