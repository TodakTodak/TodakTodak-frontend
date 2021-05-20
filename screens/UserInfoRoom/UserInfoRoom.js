import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import AlertModal from "../../components/AlertModal/AlertModal";

import { userSlice } from "../../redux/userSlice";

import styles from "./styles";

import backgroundImage from "../../assets/pngs/background.png";

const UserInfoRoom = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogoutButtonClick = async () => {
    try {
      await SecureStore.deleteItemAsync("userInfo");
      dispatch(userSlice.actions.resetUserState());
    } catch (err) {
      setIsModalVisible(false);
    }
  };

  const handleModalCloseButton = () => (
    setIsModalVisible(true)
  );

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
        <AlertModal
          message="로그아웃에 실패했습니다."
          isModalVisible={isModalVisible}
          handleModalClose={handleModalCloseButton}
        />
    </ImageBackground>
  );
}

export default UserInfoRoom;
