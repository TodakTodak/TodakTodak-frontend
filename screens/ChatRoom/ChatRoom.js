import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import io from "socket.io-client";

import styles from "./styles";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import ChatLog from "../../components/ChatLog/ChatLog";
import TextInput from "../../components/TextInput/TextInput";

import { SERVER_URL } from "@env";
import { FRIENDS } from "../../constants/navigationName";

import backgroundImage from "../../assets/pngs/background.png";

let socket;

function ChatRoom({ route, navigation }) {
  const [chats, setChats] = useState([]);
  const [comment, setComment] = useState("");
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

  const handleFriendsButtonClick = () => {
    navigation.navigate(FRIENDS);
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
          text="친구창으로"
          buttonStyle={styles.friendsRoute}
          imageStyle={styles.friendsRouteImage}
          handleClick={handleFriendsButtonClick}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Title text="소통방" imageStyle={styles.titleImage} />
          <ScrollView
            ref={scrollRef}
            style={styles.contentsWrapper}
            onContentSizeChange={scrollToBottom}
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

export default ChatRoom;
