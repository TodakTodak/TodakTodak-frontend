import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  commentBackground: {
    width: "100%",
    height: "100%"
  },
  commentsContainer: {
    width: "90%",
    height: "auto",
    minHeight: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    borderRadius: 13,
    overflow: "hidden"
  },
  commentWrapper: {
    flexDirection: "row",
    padding: 10,
    paddingLeft: 15
  },
  commentUserInfo: {
    width: "80%",
    marginRight: 10
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  userNickname: {
    marginLeft: 10
  },
  commentContent: {
    fontWeight: "bold"
  },
  buttonWrapper: {
    width: "30%",
    justifyContent: "flex-start",
    paddingRight: 10
  },
  commentLikeWrapper: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  addFriendWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    width: "60%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  buttonText: {
    fontSize: 13,
    color: "black"
  }
});

export default styles;
