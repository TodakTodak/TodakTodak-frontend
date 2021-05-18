import { StyleSheet } from "react-native";

import {
  BLACK,
  TRANSPARENCY,
  CATEGORY_CARD_TITLE
} from "../../../constants/color";

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  postTitle: {
    margin: 10,
    color: CATEGORY_CARD_TITLE,
    fontSize: 17,
    fontWeight: "bold"
  },
  postContent: {
    margin: 10,
    color: BLACK,
    fontSize: 15,
    fontWeight: "600"
  },
  likeWrapper: {
    flexDirection: "row"
  },
  likeIcon: {
    paddingTop: 11
  },
  deleteButton: {
    width: "100%",
    height: "auto",
    backgroundColor: TRANSPARENCY
  },
  deleteButtonText: {
    color: BLACK,
    fontSize: 17
  }
});

export default styles;
