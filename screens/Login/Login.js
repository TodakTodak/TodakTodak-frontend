import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import TextInput from "../../components/TextInput/TextInput";
import Loading from "../Loading/Loading";

import { fetchLogin } from "../../redux/userSlice";

import backgroundImage from "../../assets/pngs/background.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    const userInfo = { email, password };

    dispatch(fetchLogin(userInfo));
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
            placeholder="이메일을 입력해주세요"
            handleInputChange={setEmail}
            value={email}
            type="emailAddress"
          />
          <TextInput
            placeholder="비밀번호를 입력해주세요"
            isPassword={true}
            handleInputChange={setPassword}
            value={password}
            type="password"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="로그인"
            buttonStyle={styles.loginButton}
            handleClick={handleLoginClick}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  loginButton: {
    width: "90%"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 20
  },
  textInputContainer: {
    marginTop: 150,
    marginBottom: 20
  }
});

export default Login;
