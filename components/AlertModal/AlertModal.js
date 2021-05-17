import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet
} from "react-native";

import Button from "../../components/Button/Button";

function AlertModal({
  message,
  textStyles,
  ModalStyle,
  modalVisable,
  handleModalClose
}) {

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisable}
    >
      <View style={[styles.friendModal, ModalStyle]}>
        <Text style={[styles.text, textStyles]}>
          {message}
        </Text>
        <Button
          text="닫기"
          handleClick={handleModalClose}
          buttonStyle={styles.modalButton}
          textStyle={styles.modalButtonText}
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
    fontSize: 15
  },
  modalButton: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  modalButtonText: {
    marginTop: 15,
    fontSize: 17,
    color: "#000000"
  }
});

export default AlertModal;
