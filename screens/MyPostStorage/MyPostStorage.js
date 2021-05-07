import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ImageBackground,
  Text
} from "react-native";

import Title from "../../components/Title/Title";
import Category from "../../components/Category/Category";
import PostCard from "../../components/PostCard/PostCard";

import backgroundImage from "../../assets/pngs/background.png";

function MyPostStorage() {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title text="토닥 토닥" imageStyle={styles.titleImage} />
        <View style={styles.categorysWrapper}>
          <Category title="토닥 토닥" />
        </View>
        <View styles={styles.postsWrapper}>
          <PostCard postCategory="진로" postTitle="코딩? 전기?" />
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
  categorysWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  postsWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    marginTop: 40
  }
});

export default MyPostStorage;
