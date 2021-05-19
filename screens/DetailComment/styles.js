import { StyleSheet } from "react-native";

import {
  BLACK,
  TRANSPARENCY
} from "../../constants/color";

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
  postContentsWrapper: {
    width: "85%",
    height: "73%",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden"
  },
  titleText: {
    fontSize: 40
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-25%",
    left: "-10%"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 550,
    marginTop: 30,
    backgroundColor: TRANSPARENCY,
    fontSize: 20
  },
  letterPage: {
    width: "100%"
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  goodButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  sendButton: {
    width: "30%",
    backgroundColor: TRANSPARENCY
  },
  buttonText: {
    color: BLACK,
    fontSize: 20
  },
  commentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 5
  }
});

export default styles;
