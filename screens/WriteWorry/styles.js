import { StyleSheet } from "react-native";

import { OPACITY_BACKGROUND } from "../../constants/color";

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
  writeWrapper: {
    width: "90%",
    height: "70%",
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: OPACITY_BACKGROUND
  },
  letter: {
    width: "100%",
    height: "100%"
  },
  postTitle: {
    height: 35,
    margin: 30,
    marginBottom: 0,
    borderRadius: 10
  },
  contents: {
    height: 230
  }
});

export default styles;
