import { StyleSheet } from "react-native";

import {
  TRANSPARENCY,
  COMMENT_BACKGROUND
} from "../../constants/color";

const styles = StyleSheet.create({
  commentWrapper: {
    width: "90%",
    height: 50,
    minHeight: 50,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COMMENT_BACKGROUND,
    borderRadius: 10
  },
  comment: {
    width: "40%",
    justifyContent: "space-evenly",
    paddingLeft: 30
  },
  goodButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  commentLike: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: TRANSPARENCY
  },
  commentText: {
    fontSize: 15,
    color: "#000000"
  }
});

export default styles;
