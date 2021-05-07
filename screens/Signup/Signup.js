import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground
} from "react-native";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";
import TextInput from "../../components/TextInput/TextInput";

import { postSignup } from "../../api/userApi";

import backgroundImage from "../../assets/pngs/background.png";

function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSignupButtonClick = async () => {
    try {
      const signupInfo = {
        email,
        password,
        nickname
      };
      const response = await postSignup(signupInfo);

      if (response.errorMessage) {
        console.log(response.errorMessage);
        return;
      }

      navigation.navigate("Login");
    } catch (error) {
      console.log("에러 발생");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.loginContainer}>
        <Title text="토닥 토닥" imageStyle={styles.titleImage} />
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
          <TextInput
            placeholder="닉네임을 입력해주세요"
            handleInputChange={setNickname}
            value={nickname}
            type="nickname"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="회원 가입"
            buttonStyle={styles.loginButton}
            handleClick={handleSignupButtonClick}
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
  loginButton: {
    width: "90%"
  },
  titleImage: {
    top: "-30%"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginBottom: 20
  },
  textInputContainer: {
    marginTop: 20,
    marginBottom: 20
  }
});

export default Signup;
