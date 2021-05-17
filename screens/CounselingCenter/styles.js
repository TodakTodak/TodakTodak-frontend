import { StyleSheet } from "react-native";

import {
  TRANSPARENCY,
  BEST_TITLE_TEXT,
  BEST_POST_CARD_TITLE,
  BEST_POST_CARD_BACKGROUND
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
  categoryWrapper: {
    minHeight: 60,
    maxHeight: 60,
    flexDirection: "row",
    marginTop: 30
  },
  catagoryContainer: {
    width: "20%"
  },
  categoryStyle: {
    width: "90%"
  },
  postsWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto"
  },
  bestPostCard: {
    marginTop: 10,
    backgroundColor: BEST_POST_CARD_BACKGROUND
  },
  bestPostTitle: {
    color: BEST_POST_CARD_TITLE
  },
  bestPost: {
    width: "100%",
    maxHeight: 200,
    alignItems: "center"
  },
  bestText: {
    height: 30,
    color: BEST_TITLE_TEXT,
    fontWeight: "bold",
    fontSize: 17
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: TRANSPARENCY
  },
  emptyContainer: {
    marginTop: "15%"
  }
});

export default styles;
