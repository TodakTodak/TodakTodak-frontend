import { StyleSheet } from "react-native";

import {
  WHITE,
  BLACK,
  CATEGORY_CARD_TITLE,
  COURSE_COLOR,
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
  categorysWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  },
  thudamCategory: {
    backgroundColor: COURSE_COLOR
  },
  postsWrapper: {
    width: "100%",
    flexDirection: "row"
  },
  postStyle: {
    height: 520,
    backgroundColor: TRANSPARENCY,
    fontSize: 30
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: TRANSPARENCY
  },
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
    backgroundColor: TRANSPARENCY,
  },
  deleteButtonText: {
    color: BLACK,
    fontSize: 17
  },
  emptyContainer: {
    marginTop: "40%",
    alignItems: "center"
  },
  emptyBoxImage: {
    width: 100,
    height: 100
  },
  emptyText: {
    marginTop: 20,
    color: WHITE,
    fontSize: 20
  }
});

export default styles;
