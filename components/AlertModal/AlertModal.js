import React from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View
} from "react-native";

import Button from "../../components/Button/Button";

import { NANUM_REGULAR } from "../../constants/font";

function AlertModal({
  message,
  textStyles,
  ModalStyle,
  modalVisable,
  handleModalClose
}) {

  return (
    <Modal
      visible={modalVisable}
      animationType="slide"
      transparent={true}
    >
      <View style={[styles.friendModal, ModalStyle]}>
        <Text style={[styles.text, textStyles]}>
          {message}
        </Text>
        <Button
          handleClick={handleModalClose}
          buttonStyle={styles.modalButton}
          textStyle={styles.modalButtonText}
          text="닫기"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  friendModal: {
    width: "60%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "#F9FFB4",
    borderRadius: 30,
    shadowColor: "rgb(50, 50, 50)"
  },
  text: {
    fontSize: 30,
    fontFamily: NANUM_REGULAR
  },
  modalButton: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  modalButtonText: {
    marginTop: 15,
    fontSize: 20,
    color: "#000000"
  }
});

export default AlertModal;
