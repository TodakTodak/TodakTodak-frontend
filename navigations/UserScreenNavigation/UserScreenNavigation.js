import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigation from "../BottomTabNavigation/BottomTabNavigation";

import Friends from "../../screens/Friends/Friends";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";
import DetailPost from "../../screens/DetailPost/DetailPost";

const Stack = createStackNavigator();

function UserScreenNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="WriteWorry" component={WriteWorry} />
        <Stack.Screen name="DetailPost" component={DetailPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
