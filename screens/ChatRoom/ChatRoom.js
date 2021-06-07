import React, {
  useRef,
  useState,
  useEffect,
  useCallback
} from "react";
import {
  View,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import useChat from "../../hooks/useChat";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import ChatLog from "../../components/ChatLog/ChatLog";
import TextInput from "../../components/TextInput/TextInput";

import styles from "./styles";

import { FRIENDS } from "../../constants/navigationName";
import { SEND_CHAT } from "../../constants/socketEvents";

import backgroundImage from "../../assets/pngs/background.png";

const ChatRoom = ({ route }) => {
  const { chats, socket } = useChat(route.params);
  const [comment, setComment] = useState("");

  const scrollRef = useRef();
  const navigation = useNavigation();

  const {
    user,
    friendInfo,
    chatRoomId
  } = route.params;

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = useCallback(() => (
    scrollRef.current.scrollToEnd({ animated: true })
  ), []);

  const handleSendChatClick = useCallback(() => {
    if (socket) {
      const chatInfo = {
        user,
        friendInfo,
        chatRoomId,
        comment: comment.trim()
      };

      if (!comment) return;

      socket.emit(SEND_CHAT, chatInfo);
      setComment("");
    }
  }, [comment]);

  const handleFriendsButtonClick = useCallback(() => {
    navigation.navigate(FRIENDS);
  }, []);

  const renderChatLogs = useCallback(({ item }) => {
    return (
      <ChatLog
        comment={item.comment}
        createdAt={item.createdAt}
        userNickname={item.userNickname}
        systemMessage={item.systemMessage}
      />
    );
  }, [chats]);

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
          <FlatList
            data={chats}
            ref={scrollRef}
            renderItem={renderChatLogs}
            style={styles.contentsWrapper}
            onContentSizeChange={scrollToBottom}
            keyExtractor={(item) => item.createdAt}
          />
          <View style={styles.inputWrapper}>
            <TextInput
              value={comment}
              style={styles.textInput}
              placeholder="위로말을 해주세요..."
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

export default React.memo(ChatRoom);
