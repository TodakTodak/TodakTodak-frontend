import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Title from "../../components/Title/Title";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";

import backgroundImage from "../../assets/pngs/background.png";
import home from "../../assets/pngs/home.png";

function ChatRoom() {
  const navigation = useNavigation();

  const handleHomeButtonClick = () => {
    navigation.navigate("Home");
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
          <View style={styles.contentsWrapper}></View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="채팅 치는 창"
            />
            <Button
              text="SEND"
              buttonStyle={styles.sendButton}
              textStyle={styles.sendButtonText}
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
    fontSize: 20,
  }
});

export default ChatRoom;
