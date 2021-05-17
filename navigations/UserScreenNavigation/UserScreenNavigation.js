import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigation from "../BottomTabNavigation/BottomTabNavigation";

import Answer from "../../screens/Answer/Answer";
import ChatRoom from "../../screens/ChatRoom/ChatRoom";
import DetailPost from "../../screens/DetailPost/DetailPost";
import DetailComment from "../../screens/DetailComment/DetailComment";

import {
  ANSWER,
  CHAT_ROOM,
  DETAIL_POST,
  DETAIL_COMMENT,
  BOTTOM_TAB_NAVIGATION
} from "../../constants/navigationName";

const Stack = createStackNavigator();

function UserScreenNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={BOTTOM_TAB_NAVIGATION} component={BottomTabNavigation} />
        <Stack.Screen name={ANSWER} component={Answer} />
        <Stack.Screen name={CHAT_ROOM} component={ChatRoom} />
        <Stack.Screen name={DETAIL_POST} component={DetailPost} />
        <Stack.Screen name={DETAIL_COMMENT} component={DetailComment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
