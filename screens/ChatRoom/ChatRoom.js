import React, {
  useRef,
  useState,
  useEffect
} from "react";
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
import {
  JOIN_ROOM,
  SEND_CHAT,
  LEAVE_USER,
  RECEIVE_CHAT,
  JOIN_USER_MESSAGE,
  LEAVE_USER_MESSAGE,
  RECEIVE_INITAL_CHATS
} from "../../constants/socketEvents";

import backgroundImage from "../../assets/pngs/background.png";

let socket;

const ChatRoom = ({ route, navigation }) => {
  const [chats, setChats] = useState([]);
  const [comment, setComment] = useState("");
  const scrollRef = useRef();

  const {
    chatRoomId,
    userNickname
  } = route.params;

  useEffect(() => {
    const joinUserInfo = {
      chatRoomId,
      userNickname
    };

    socket = io.connect(SERVER_URL);

    socket.emit(JOIN_ROOM, joinUserInfo);

    socket.on(RECEIVE_CHAT, (data) =>
      setChats((chats) => [...chats, data])
    );

    socket.on(RECEIVE_INITAL_CHATS, (data) =>
      setChats(data)
    );

    socket.on(JOIN_USER_MESSAGE, (data) =>
      setChats((chats) => [...chats, data])
    );

    socket.on(LEAVE_USER_MESSAGE, (data) =>
      setChats((chats) => [...chats, data])
    );

    return () => {
      socket.emit(LEAVE_USER, joinUserInfo);
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
        chatRoomId,
        userNickname,
        comment: comment.trim()
      };

      if (!comment) return;

      socket.emit(SEND_CHAT, chatInfo);
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
