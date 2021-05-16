import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";

import Title from "../../components/Title/Title";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import ChatLog from "../../components/ChatLog/ChatLog";

import { SERVER_URL } from "@env";

import backgroundImage from "../../assets/pngs/background.png";
import home from "../../assets/pngs/home.png";

let socket;

function ChatRoom({ route }) {
  const [comment, setComment] = useState("");
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const scrollRef = useRef();
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

    socket.on("join user message", (data) =>
      setChats((chats) => [...chats, data])
    );

    socket.on("leave user message", (data) =>
      setChats((chats) => [...chats, data])
    );

    return () => {
      socket.emit("leave user", joinUserInfo);
      socket.removeAllListeners();
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
      const chatInfo = {
        userNickname,
        comment: comment.trim(),
        chatRoomId
      };

      if (!comment) return;

      socket.emit("send chat", chatInfo);
      setComment("");
    }
  };

  const handleHomeButtonClick = () => {
    navigation.navigate("Home");
  };

  const renderChats = () => {
    return chats.map((chat) => {
      const {
        comment,
        createdAt,
        userNickname,
        systemMessage
      } = chat;

      return (
        <ChatLog
          key={createdAt}
          comment={comment}
          createdAt={createdAt}
          userNickname={userNickname}
          systemMessage={systemMessage}
        />
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
  }
});

export default ChatRoom;
