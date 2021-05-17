import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import Loading from "../../screens/Loading/Loading";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import PostCard from "../../components/PostCard/PostCard";
import EmptyView from "../../components/EmptyView/EmptyView";
import CategoryButton from "../../components/CategoryButton/CategoryButton";

import {
  deleteMyPost,
  fetchMyPosts,
  deleteMyComment,
  fetchMyComments,
} from "../../redux/userSlice";

import backgroundImage from "../../assets/pngs/background.png";

function MyPostStorage() {
  const [activeCategory, setActiveCategory] = useState("나의 고민들");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    email,
    posts,
    comments,
    isLoading,
    isFetchedPosts,
    isFetchedComments
  } = useSelector((state) => state.user);

  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", () => {
      if (activeCategory === "나의 고민들") {
        dispatch(fetchMyPosts(email));
      }
      if (activeCategory === "나의 위로들") {
        dispatch(fetchMyComments(email));
      }
    });

    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    if (activeCategory === "나의 고민들") {
      dispatch(fetchMyPosts(email));
    }
    if (activeCategory === "나의 위로들") {
      dispatch(fetchMyComments(email));
    }
  }, [activeCategory]);

  const renderMyPosts = () => {
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
        navigation.navigate("DetailPost", { postId: _id })
      );

      const handleDeleteButtonClick = () => (
        dispatch(deleteMyPost(_id))
      );

      return (
        <PostCard
          key={_id}
          handleClick={handlePostClick}
        >
          <View style={styles.postContainer}>
            <View>
              <Text style={styles.postTitle}>
                {title}
              </Text>
              <Text style={styles.postContent}>
                {category} / {createdAt.substring(0, 10)}
              </Text>
            </View>
            <View>
              <View style={styles.likeWrapper}>
                <AntDesign
                  style={styles.likeIcon}
                  size={15}
                  color="red"
                  name="heart"
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

  const renderMyComments = () => {
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
        navigation.navigate("Answer", {
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
                  style={styles.likeIcon}
                  size={15}
                  color="red"
                  name="heart"
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

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <Title
          text="고민 저장소"
          textStyle={styles.titleText}
          imageStyle={styles.titleImage}
        />
        <View style={styles.categorysWrapper}>
          <CategoryButton
            title="나의 고민들"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
          />
          <CategoryButton
            title="나의 위로들"
            focusValue={activeCategory}
            handleClick={setActiveCategory}
            categoryStyle={styles.thudamCategory}
          />
        </View>
        {isLoading ?
          <View style={styles.loadingWrapper}>
            <Loading style={styles.loading} />
          </View> :
          <ScrollView styles={styles.postsWrapper}>
            {activeCategory === "나의 고민들" ?
              renderMyPosts() :
              renderMyComments()
            }
          </ScrollView>
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  categorysWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40
  },
  thudamCategory: {
    backgroundColor: "rgba(239, 255, 56, 0.3)"
  },
  postsWrapper: {
    width: "100%",
    flexDirection: "row"
  },
  postStyle: {
    height: 520,
    backgroundColor: "rgba(0, 0, 0, 0)",
    fontSize: 30
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
  postContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  postTitle: {
    margin: 10,
    color: "#9e0031",
    fontSize: 17,
    fontWeight: "bold"
  },
  postContent: {
    margin: 10,
    color: "#000000",
    fontSize: 15,
    fontWeight: "600"
  },
  likeWrapper: {
    flexDirection: "row"
  },
  likeIcon: {
    paddingTop: 11
  },
  deleteButton: {
    width: "100%",
    height: "auto",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  deleteButtonText: {
    color: "black",
    fontSize: 17
  },
  emptyContainer: {
    marginTop: "40%",
    alignItems: "center"
  },
  emptyBoxImage: {
    width: 100,
    height: 100
  },
  emptyText: {
    marginTop: 20,
    color: "#ffffff",
    fontSize: 20
  }
});

export default MyPostStorage;
