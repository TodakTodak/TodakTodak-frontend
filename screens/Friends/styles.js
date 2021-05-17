import { StyleSheet } from "react-native";

import { CATEGORY_ACTIVE_COLOR, TRANSPARENCY } from "../../constants/color";

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  friendsContainer: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  categoryWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  },
  activeCategoryBackground: {
    backgroundColor: CATEGORY_ACTIVE_COLOR
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: TRANSPARENCY
  }
});

export default styles;
