import { StyleSheet } from "react-native";

import {
  WHITE,
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
