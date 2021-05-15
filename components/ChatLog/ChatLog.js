import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";

function ChatLog({
  comment,
  userNickname,
}) {
  const currentUser = useSelector((state) => state.user);

  return (
    <View
      style={
        userNickname === currentUser.nickname ?
          styles.myChatInfo :
          styles.friendChatInfo
      }
    >
      <Text>{userNickname}</Text>
      <View
        style={
          userNickname === currentUser.nickname ?
            styles.myChatBox :
            styles.friendChatBox
        }
      >
        <Text style={styles.chatText}>{comment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myChatInfo: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 5,
    padding: 10
  },
  friendChatInfo: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 5,
    padding: 10,
  },
  myChatBox: {
    minWidth: "20%",
    height: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 5,
    padding: 5,
    backgroundColor: "pink",
    borderRadius: 7
  },
  friendChatBox: {
    minWidth: "20%",
    height: 30,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 5,
    padding: 5,
    backgroundColor: "#BE79DF",
    borderRadius: 7
  },
  chatText: {
    fontWeight: "bold",
    color: "black"
  }
});

export default ChatLog;
