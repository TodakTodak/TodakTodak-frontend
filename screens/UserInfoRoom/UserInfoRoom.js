import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";

import { userSlice } from "../../redux/userSlice";

import backgroundImage from "../../assets/pngs/background.png";

function userInfoRoom() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogoutButtonClick = async () => {
    await SecureStore.deleteItemAsync("userInfo");
    dispatch(userSlice.actions.resetUserState());
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <Title text="토닥 토닥" />
      <View style={styles.userRoomContainer}>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfo}>
            이메일: {user.email ? user.email : ""}
          </Text>
          <Text style={styles.userInfo}>
            닉네임: {user.nickname ? user.nickname : ""}
          </Text>
        </View>
          <Button
            text="로그아웃"
            buttonStyle={styles.logoutButton}
            handleClick={handleLogoutButtonClick}
          />
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%"
  },
  userRoomContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  userInfoWrapper: {
    margin: 20,
    marginTop: 100
  },
  userInfo: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff"
  },
  logoutButton: {
    width: "60%",
    height: "7%",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "rgba(249, 255, 180, 0.8)"
  }
});

export default userInfoRoom;
