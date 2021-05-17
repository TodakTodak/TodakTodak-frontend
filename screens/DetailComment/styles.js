import { StyleSheet } from "react-native";

import {
  BLACK,
  WHITE,
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
    width: "90%",
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
    height: 500,
    marginTop: 30,
    backgroundColor: TRANSPARENCY,
    fontSize: 25,
  },
  letterPage: {
    width: "100%"
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  goodButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  sendButton: {
    width: "30%",
    margin: 20,
    backgroundColor: WHITE
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
