import React, { useState } from "react";
import {
  View,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";

import Loading from "../Loading/Loading";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";
import AlertModal from "../../components/AlertModal/AlertModal";

import { fetchLogin, userSlice } from "../../redux/userSlice";

import backgroundImage from "../../assets/pngs/background.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, message } = useSelector((state) => state.user);

  const handleLoginClick = () => {
    const userInfo = { email, password };

    dispatch(fetchLogin(userInfo));
  };

  const handleModalCloseButton = () => {
    dispatch(userSlice.actions.clearMessage());
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title text="토닥 토닥" />
        <View style={styles.textInputContainer}>
          <TextInput
            value={email}
            type="emailAddress"
            handleInputChange={setEmail}
            placeholder="이메일을 입력해주세요"
          />
          <TextInput
            type="password"
            value={password}
            isPassword={true}
            handleInputChange={setPassword}
            placeholder="비밀번호를 입력해주세요"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="로그인"
            handleClick={handleLoginClick}
            buttonStyle={styles.loginButton}
          />
        </View>
      </View>
      {message &&
        <AlertModal
          message={message}
          handleModalClose={handleModalCloseButton}
        />
      }
    </ImageBackground>
  );
}

export default Login;
