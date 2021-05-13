import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigation from "../BottomTabNavigation/BottomTabNavigation";

import Friends from "../../screens/Friends/Friends";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";
import DetailPost from "../../screens/DetailPost/DetailPost";
import Answer from "../../screens/Answer/Answer";
import ChatRoom from "../../screens/ChatRoom/ChatRoom";
import DetailComment from "../../screens/DetailComment/DetailComment";

const Stack = createStackNavigator();

function UserScreenNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="WriteWorry" component={WriteWorry} />
        <Stack.Screen name="DetailPost" component={DetailPost} />
        <Stack.Screen name="Answer" component={Answer} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="DetailComment" component={DetailComment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
