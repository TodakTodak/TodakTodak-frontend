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
  CHATROOM,
  DETAILPOST,
  DETAILCOMMENT,
  BOTTOMTABNAVIGATION
} from "../../constants/navigationName";

const Stack = createStackNavigator();

function UserScreenNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={BOTTOMTABNAVIGATION} component={BottomTabNavigation} />
        <Stack.Screen name={ANSWER} component={Answer} />
        <Stack.Screen name={CHATROOM} component={ChatRoom} />
        <Stack.Screen name={DETAILPOST} component={DetailPost} />
        <Stack.Screen name={DETAILCOMMENT} component={DetailComment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
