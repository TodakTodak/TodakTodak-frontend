import React from "react";
import { FlatList } from "react-native";

import EmptyView from "../../../components/EmptyView/EmptyView";
import FriendCard from "../../../components/FriendCard/FriendCard";

import { NOT_EXIST_FRIEND } from "../../../constants/friendStatus";

const FriendList = ({ friendList }) => {
  const renderFriends = ({ item }) =>
    <FriendCard friend={item} />;

  return (
    <>
      {(!friendList || friendList.length < 1)
        ? <EmptyView
          text={NOT_EXIST_FRIEND}
        />
        : <FlatList
          data={friendList}
          renderItem={renderFriends}
          keyExtractor={(item) => item._id}
        />
      }
    </>
  );
};

export default FriendList;
