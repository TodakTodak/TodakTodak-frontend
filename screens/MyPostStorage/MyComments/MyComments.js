import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import styles from "../MyPosts/styles";

import Button from "../../../components/Button/Button";
import PostCard from "../../../components/PostCard/PostCard";
import EmptyView from "../../../components/EmptyView/EmptyView";

import { deleteMyComment } from "../../../redux/userSlice";

import { ANSWER } from "../../../constants/navigationName";

const MyComments = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { comments } = useSelector((state) => state.user);

  if (!comments.length) {
    return <EmptyView text="작성한 고민글이 없습니다." />;
  }

  return comments.map((comment) => {
    const {
      _id,
      post,
      likes,
      content,
      createdAt
    } = comment;

    const handleCommentClick = () => {
      navigation.navigate(ANSWER, {
        postId: post,
        commentInfo: comment
      });
    };

    const handleDeleteButtonClick = () => (
      dispatch(deleteMyComment(_id))
    );

    return (
      <PostCard
        key={_id}
        handleClick={handleCommentClick}
      >
        <View style={styles.postContainer}>
          <View>
            <Text style={styles.postTitle}>
              {content.substring(0, 8)}
            </Text>
            <Text style={styles.postContent}>
              {createdAt.substring(0, 10)}
            </Text>
          </View>
          <View>
            <View style={styles.likeWrapper}>
              <AntDesign
                size={15}
                color="red"
                name="heart"
                style={styles.likeIcon}
              />
              <Text style={styles.postContent}>
                {likes.length}
              </Text>
            </View>
            <Button
              text="삭제"
              buttonStyle={styles.deleteButton}
              textStyle={styles.deleteButtonText}
              handleClick={handleDeleteButtonClick}
            />
          </View>
        </View>
      </PostCard>
    );
  });
};

export default MyComments;
