import React, { useState } from "react";
import {
  View,
  ScrollView,
  ImageBackground
} from "react-native";

import Comment from "./Comment/Comment";
import Title from "../../components/Title/Title";
import EmptyView from "../../components/EmptyView/EmptyView";
import AlertModal from "../../components/AlertModal/AlertModal";

import styles from "./styles";

import backgroundImage from "../../assets/pngs/background.png";

const Comments = ({ route }) => {
  const [message, setMessage] = useState(null);
  const { comments } = route.params;

  const clearErrorMessage = () => {
    setMessage(null);
  };

  const renderComments = () => {
    return comments.map((comment) =>
      <Comment
        key={comment._id}
        comment={comment}
        alertMessage={setMessage}
      />
    );
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.title}>
        <Title
          text="댓글 리스트"
          imageStyle={styles.titleImage}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {comments.length < 1
          ? <EmptyView text="댓글이 없습니다." />
          : renderComments()
        }
        <View style={{ height: 1000 }} />
      </ScrollView>
      {message &&
        <AlertModal
          message={message}
          handleModalClose={clearErrorMessage}
        />
      }
    </ImageBackground>
  );
};

export default Comments;
