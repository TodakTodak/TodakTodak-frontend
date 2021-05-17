import React from "react";
import {
  Text,
  View,
  ImageBackground
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import styles from "./styles";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";

import { userSlice } from "../../redux/userSlice";

import backgroundImage from "../../assets/pngs/background.png";

function UserInfoRoom() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

export default UserInfoRoom;
