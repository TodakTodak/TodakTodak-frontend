import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";

import {
  BLACK,
  YELLOW,
  FRIEND_CHAT_BACKGROUND
} from "../../constants/color";

function ChatLog({
  comment,
  createdAt,
  userNickname,
  systemMessage
}) {
  const currentUser = useSelector((state) => state.user);

  if (systemMessage) {
    return (
      <View style={styles.systemMessage}>
        <Text>{systemMessage}</Text>
      </View>
    );
  }

  return (
    <View
      style={
        userNickname === currentUser.nickname ?
          styles.myChatInfo :
          styles.friendChatInfo
      }
    >
      <Text style={styles.nickname}>
        {userNickname}
      </Text>
      <View
        style={
          userNickname === currentUser.nickname ?
            styles.myChatBox :
            styles.friendChatBox
        }
      >
        <Text style={styles.chatText}>
          {comment}
        </Text>
        <Text style={styles.chatDate}>
          {Date(createdAt).substring(16, 21)}
        </Text>
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
  nickname: {
    fontSize: 15,
    fontWeight: "bold"
  },
  myChatBox: {
    minWidth: "20%",
    minHeight: 40,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 5,
    padding: 10,
    backgroundColor: YELLOW,
    borderRadius: 7
  },
  friendChatBox: {
    minWidth: "20%",
    minHeight: 40,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 5,
    padding: 5,
    backgroundColor: FRIEND_CHAT_BACKGROUND,
    borderRadius: 7
  },
  chatText: {
    fontSize: 15,
    fontWeight: "bold",
    color: BLACK
  },
  chatDate: {
    fontSize: 10
  },
  systemMessage: {
    alignItems: "center",
    fontWeight: "bold"
  }
});

export default ChatLog;
