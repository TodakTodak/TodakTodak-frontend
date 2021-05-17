import React, { useEffect } from "react";
import { View, ImageBackground } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import styles from "./styles";

import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";

import { fetchLogin } from "../../redux/userSlice";

import { LOGIN, SIGNUP } from "../../constants/navigationName";

import backgroundImage from "../../assets/pngs/background.png";

function Intro() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async function authLogin() {
      try {
        const userInfo = await SecureStore.getItemAsync("userInfo");
        const parsedUserInfo = JSON.parse(userInfo);

        if (parsedUserInfo.email) {
          dispatch(fetchLogin(parsedUserInfo));
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  const handleLoginClick = () => {
    navigation.navigate(LOGIN);
  };

  const handleSignupClick = () => {
    navigation.navigate(SIGNUP);
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View>
        <Title text="토닥 토닥"
          titleStyle={styles.titleContainer}
          imageStyle={styles.titleImage}
        />
        <View style={styles.buttonContainer}>
          <Button text="로그인" handleClick={handleLoginClick} />
          <Button text="회원가입" handleClick={handleSignupClick} />
        </View>
      </View>
    </ImageBackground>
  );
}

export default Intro;
