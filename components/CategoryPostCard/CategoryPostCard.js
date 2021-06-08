/**
 * Component for showing post information to the user.
 * When pressed, executes something handleClick function.
 *
 * @component
 *
 * @param {Object} postInfo A post information
*  The information have likes, title, createdAt, isAnonymous, ownerNickname
 * @param {Function} handleClick When pressed, executes something
 * @param {Function} handleDeleteClick When pressed, delete post
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import Button from "../Button/Button";

import styles from "./styles";

import { RED } from "../../constants/color";
import { CONTENTS_TITLE_LIMIT } from "../../constants/category";

const CategoryPostCard = ({
  postInfo,
  cardStyle,
  titleStyle,
  handleClick,
  handleDeleteClick
}) => {
  const {
    likes,
    title,
    createdAt,
    isAnonymous,
    ownerNickname
  } = postInfo;

  return (
    <>
      {0 < Object.keys(postInfo).length &&
        <TouchableOpacity
          onPress={handleClick}
          style={[ styles.postCard, cardStyle ]}
        >
          <View style={styles.cardWrapper}>
            <View>
              <Text style={[ styles.postTitle, titleStyle ]}>
                {CONTENTS_TITLE_LIMIT < title.length
                  ? `${title.substring(0, 8)}...`
                  : title
                }
              </Text>
              <View style={styles.postContentsWrapper}>
                <Text style={styles.postContent}>
                  {isAnonymous ? "익명" : ownerNickname}
                </Text>
                <Text style={styles.postContent}>
                  {createdAt.substring(0, 10)}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.likeWrapper}>
                <AntDesign
                  size={15}
                  color={RED}
                  name="heart"
                  style={styles.likeIcon}
                />
                <Text style={styles.postContent}>
                  {likes.length}
                </Text>
              </View>
              {handleDeleteClick &&
                <Button
                  text="삭제"
                  handleClick={handleDeleteClick}
                  buttonStyle={styles.deleteButton}
                  textStyle={styles.deleteButtonText}
                />
              }
            </View>
          </View>
        </TouchableOpacity>
      }
    </>
  );
}

export default React.memo(CategoryPostCard);
