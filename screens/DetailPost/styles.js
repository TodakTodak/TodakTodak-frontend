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
    height: "100%"
  },
  postContentsWrapper: {
    width: "90%",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 550,
    backgroundColor: TRANSPARENCY,
    fontSize: 20
  },
  letterPage: {
    width: "100%"
  },
  commentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 5
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
