import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import Title from "../../components/Title/Title";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";

import { SERVER_URL } from "@env";

import backgroundImage from "../../assets/pngs/background.png";
import home from "../../assets/pngs/home.png";

let socket;

function ChatRoom({ route }) {
  const [comment, setComment] = useState("");
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const scrollRef = useRef();
  const currentUser = useSelector((state) => state.userReducer);
  const { userNickname, chatRoomId } = route.params;

  useEffect(() => {
    const joinUserInfo = { userNickname, chatRoomId };

    socket = io.connect(SERVER_URL);

    socket.emit("join room", joinUserInfo);

    socket.on("receive chat", (data) =>
      setChats((chats) => [...chats, data])
    );

    socket.on("receive inital chats", (data) =>
      setChats(data)
    );

    return () => {
      socket.emit("leave user", joinUserInfo);
      socket.off("receive chat");
      socket.off("receive inital chats");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => (
    scrollRef.current.scrollToEnd({ animated: true })
  );

  const handleSendChatClick = () => {
    if (socket) {
      const chatInfo = { userNickname, comment, chatRoomId };

      socket.emit("send chat", chatInfo);
      setComment("");
    }
  };

  const handleHomeButtonClick = () => {
    navigation.navigate("Home");
  };

  const renderChats = () => {
    return chats.map((chat) => {
      const { createdAt, userNickname, comment } = chat;

      return (
        <View key={createdAt}
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
    });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.wrapper}>
        <Button
          text="홈으로"
          image={home}
          imageStyle={styles.homeButtonImage}
          buttonStyle={styles.homeButton}
          handleClick={handleHomeButtonClick}
      />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Title text="소통방" imageStyle={styles.titleImage} />
          <ScrollView
            ref={scrollRef}
            onContentSizeChange={scrollToBottom}
            style={styles.contentsWrapper}
          >
            {renderChats()}
          </ScrollView>
          <View style={styles.inputWrapper}>
            <TextInput
              value={comment}
              placeholder="채팅 치는 창"
              style={styles.textInput}
              handleInputChange={setComment}
            />
            <Button
              text="SEND"
              buttonStyle={styles.sendButton}
              textStyle={styles.sendButtonText}
              handleClick={handleSendChatClick}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%"
  },
  wrapper: {
    flex: 1
  },
  homeButton: {
    position: "absolute",
    width: "30%",
    height: "10%",
    top: 20,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 1
  },
  homeButtonImage: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  titleImage: {
    left: "27%",
  },
  contentsWrapper: {
    flex: 1,
    width: "90%",
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30
  },
  inputWrapper: {
    width: "75%",
    height: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    marginBottom: 30,
    borderRadius: 10
  },
  textInput: {
    width: "95%"
  },
  sendButton: {
    width: "20%",
    minHeight: 45
  },
  sendButtonText: {
    fontSize: 15,
  },
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

export default ChatRoom;
