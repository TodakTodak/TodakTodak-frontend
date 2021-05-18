import { StyleSheet } from "react-native";

import {
  WHITE,
  BLACK,
  CORAL,
  YELLOW,
  TRANSPARENCY
} from "../../constants/color";

const styles = StyleSheet.create({
  friend: {
    width: "90%",
    minHeight: "20%",
    minHeight: "10%",
    maxHeight: "15%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
    marginLeft: 20,
    padding: 5,
    borderRadius: 10,
    backgroundColor: WHITE,
  },
  friendInfoWrapper: {
    width: "60%",
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  friendInfo: {
    justifyContent: "center"
  },
  friendAvatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: YELLOW,
    marginRight: 10
  },
  friendName: {
    fontSize: 15
  },
  friendStatusText: {
    color: CORAL,
    fontSize: 15
  },
  buttons: {
    width: "50%",
    flexDirection: "row"
  },
  friendButton: {
    width: "20%",
    minWidth: "20%",
    backgroundColor: TRANSPARENCY
  },
  buttonText: {
    fontSize: 15,
    color: BLACK
  }
});

export default styles;
