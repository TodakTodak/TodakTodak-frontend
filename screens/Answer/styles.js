import { StyleSheet } from "react-native";

import { BLACK, TRANSPARENCY } from "../../constants/color";

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  postContentsWrapper: {
    width: "90%",
    marginTop: 30,
    borderRadius: 20,
    overflow: "hidden"
  },
  titleImage: {
    left: "15%"
  },
  contents: {
    height: 530,
    marginTop: 30,
    backgroundColor: TRANSPARENCY,
    fontSize: 20
  },
  letterPage: {
    width: "100%"
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: "20%",
    backgroundColor: TRANSPARENCY
  },
  buttonText: {
    color: BLACK,
    fontSize: 18
  }
});

export default styles;
