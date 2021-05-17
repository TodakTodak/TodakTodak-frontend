import React from "react";
import {
  View,
  Text,
  Modal
} from "react-native";

import Button from "../../components/Button/Button";

import styles from "./styles";

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

export default AlertModal;
