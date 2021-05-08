import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View
} from "react-native";

import Title from "../../components/Title/Title";
import Category from "../../components/Category/Category";
import TextInput from "../../components/TextInput/TextInput";

import backgroundImage from "../../assets/pngs/background.png";

function DetailPost({ route }) {
  const {
    userId,
    contents,
    category,
    postOwner,
    inputStyle
  } = route.params;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title
          text={userId ? `${postOwner}의 고민` : "나의 고민"}
          imageStyle={styles.titleImage}
        />
        <View style={styles.categoryWrapper}>
          <Category title={category} />
          <TextInput
            style={[styles.contents, inputStyle]}
            editable={false}
            value={contents}
            isMultiline={true}
          />
        </View>
      {userId &&
        <View>
          <TextInput
            style={[styles.contents, inputStyle]}
            editable={true}
            isMultiline={true}
            placeholder="본인의 이야기 혹은 위로를 적어주세요"
          />
        </View>
      }
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
  categoryWrapper: {
    alignItems: "center",
    marginTop: 50
  },
  contents: {
    height: 400,
    marginTop: 30
  }
});

export default DetailPost;
