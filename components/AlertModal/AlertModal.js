import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet
} from "react-native";

import Button from "../../components/Button/Button";

import {
  BLACK,
  TRANSPARENCY,
  MODALBACKGROUND
} from "../../constants/color";

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
    backgroundColor: MODALBACKGROUND,
    borderRadius: 30
  },
  text: {
    fontSize: 15
  },
  modalButton: {
    backgroundColor: TRANSPARENCY
  },
  modalButtonText: {
    marginTop: 15,
    fontSize: 17,
    color: BLACK
  }
});

export default AlertModal;
