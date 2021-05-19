import { StyleSheet } from "react-native";

import { TRANSPARENCY } from "../../constants/color";

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
    height: "70%",
    marginTop: 40,
    borderRadius: 20,
    overflow: "hidden"
  },
  titleImage: {
    left: "15%"
  },
  contents: {
    height: 500,
    marginTop: 30,
    backgroundColor: TRANSPARENCY,
    fontSize: 20
  },
  letterPage: {
    width: "100%"
  }
});

export default styles;
