import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Button from "../../../components/Button/Button";
import PostCard from "../../../components/PostCard/PostCard";
import EmptyView from "../../../components/EmptyView/EmptyView";

import { deleteMyPost } from "../../../redux/userSlice";

import styles from "./styles";

import { DETAIL_POST } from "../../../constants/navigationName";

const MyPosts = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { posts, accessToken } = useSelector((state) => state.user);

  if (!posts.length) {
    return <EmptyView text="작성한 고민글이 없습니다" />;
  }

  return posts.map((post) => {
    const {
      _id,
      likes,
      title,
      category,
      createdAt
    } = post;

    const handlePostClick = () => (
      navigation.navigate(DETAIL_POST, { accessToken, postId: _id })
    );

    const handleDeleteButtonClick = () => (
      dispatch(deleteMyPost({ postId: _id, accessToken }))
    );

    return (
      <PostCard
        key={_id}
        handleClick={handlePostClick}
      >
        <View style={styles.postContainer}>
          <View>
            <Text style={styles.postTitle}>
              {9 < title.length ? `${title.substring(0, 8)}...` : title}
            </Text>
            <Text style={styles.postContent}>
              {category} / {createdAt.substring(0, 10)}
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

export default MyPosts;
