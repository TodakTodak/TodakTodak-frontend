import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Button from "../../../components/Button/Button";
import PostCard from "../../../components/PostCard/PostCard";
import EmptyView from "../../../components/EmptyView/EmptyView";

import { deleteMyComment } from "../../../redux/userSlice";

import styles from "./styles";

import { ANSWER } from "../../../constants/navigationName";
import { CONTENTS_TITLE_LIMIT } from "../../../constants/category";

const MyComments = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { comments, accessToken } = useSelector((state) => state.user);

  if (!comments || !comments.length) {
    return <EmptyView text="작성한 위로글이 없습니다." />;
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
      dispatch(deleteMyComment({ commentId: _id, accessToken }))
    );

    return (
      <PostCard
        key={_id}
        handleClick={handleCommentClick}
      >
        <View style={styles.postContainer}>
          <View>
            <Text style={styles.postTitle}>
              {CONTENTS_TITLE_LIMIT < content.length
                ? `${content.substring(0, 8)}...`
                : content
              }
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
