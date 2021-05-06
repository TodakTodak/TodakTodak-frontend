import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground
} from "react-native";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";

import feather from "../../assets/pngs/feather.png";
import rabbits from "../../assets/pngs/rabbits.png";
import mySoundLogo from "../../assets/pngs/mySoundLogo.png";
import backgroundImage from "../../assets/pngs/background.png";

function Home({ navigation }) {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.homeContainer}>
        <Title text="토닥 토닥" imageStyle={styles.titleImage} />
        <View style={styles.buttonContainer}>
          <Button
            text="내 마음의 소리 저장소"
            buttonStyle={styles.roomButton}
            image={mySoundLogo}
          />
          <Button
            text="고민 상담소"
            buttonStyle={styles.roomButton}
            image={rabbits}
          />
          <Button
            text="고민을 써주세요"
            buttonStyle={styles.writeButton}
            image={feather}
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
  homeContainer: {
    width: "100%",
  },
  titleImage: {
    top: "-30%"
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
    marginBottom: 20,
  },
  roomButton: {
    width: "90%",
    height: "20%",
    marginBottom: 50,
    backgroundColor: "rgba(249, 255, 180, 0.8)"
  },
  writeButton: {
    width: "90%",
    height: "20%",
    marginTop: 50,
    backgroundColor: "rgba(252, 221, 236, 0.8)"
  },
});

export default Home;
