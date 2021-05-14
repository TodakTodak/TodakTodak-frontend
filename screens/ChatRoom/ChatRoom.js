import React, { useEffect, useState } from "react";
import {
  Text,
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

import { SERVER_URL } from "@env";

import backgroundImage from "../../assets/pngs/background.png";
import home from "../../assets/pngs/home.png";

let socket;

function ChatRoom({ route }) {
  const [comment, setComment] = useState("");
  const [chats, setChats] = useState([]);
  const navigation = useNavigation();
  const { userEmail, friendEmail } = route.params;

  useEffect(() => {
    const joinUserInfo = { userEmail, friendEmail };

    socket = io.connect(SERVER_URL);

    socket.emit("join room", joinUserInfo);

    socket.on("receive chat", (data) =>
      setChats((chats) => [...chats, data])
    );
  }, []);

  const handleSendChatClick = () => {
    if (socket) {
      const chatInfo = { userEmail, comment };

      socket.emit("send chat", chatInfo);
    }
  };

  const handleHomeButtonClick = () => {
    navigation.navigate("Home");
  };

  const renderChats = () => {
    return chats.map((chat) => {
      const { createdAt, userEmail, comment } = chat;

      return (
        <View key={createdAt} style={{ flexDirection: "row" }}>
          <Text>{userEmail}{createdAt}</Text>
          <Text>{comment}</Text>
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
          <ScrollView style={styles.contentsWrapper}>
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
    width: "30%",
    height: "10%"
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
