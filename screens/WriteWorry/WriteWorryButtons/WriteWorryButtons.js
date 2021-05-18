import React from "react";

import styles from "./styles";

import Button from "../../../components/Button/Button";

const WriteWorryButtons = ({
  postInfo,
  handleModifyButtonClick,
  handleSubmitButtonClick
}) => {
  return (
    <>
      {0 < Object.keys(postInfo).length ?
        <Button
          text="고민 수정하기"
          textStyle={styles.buttonText}
          buttonStyle={styles.sendButton}
          handleClick={handleModifyButtonClick}
        /> :
        <Button
          text="고민 제출하기"
          textStyle={styles.buttonText}
          buttonStyle={styles.sendButton}
          handleClick={handleSubmitButtonClick}
        />
      }
    </>
  );
};

export default WriteWorryButtons;
