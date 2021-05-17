import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BOTTOM_TAB_NAVIGATION from "../BOTTOM_TAB_NAVIGATION/BOTTOM_TAB_NAVIGATION";

import Answer from "../../screens/Answer/Answer";
import CHAT_ROOM from "../../screens/CHAT_ROOM/CHAT_ROOM";
import DETAIL_POST from "../../screens/DETAIL_POST/DETAIL_POST";
import DETAIL_COMMENT from "../../screens/DETAIL_COMMENT/DETAIL_COMMENT";

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
        <Stack.Screen name={BOTTOM_TAB_NAVIGATION} component={BOTTOM_TAB_NAVIGATION} />
        <Stack.Screen name={ANSWER} component={Answer} />
        <Stack.Screen name={CHAT_ROOM} component={CHAT_ROOM} />
        <Stack.Screen name={DETAIL_POST} component={DETAIL_POST} />
        <Stack.Screen name={DETAIL_COMMENT} component={DETAIL_COMMENT} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
