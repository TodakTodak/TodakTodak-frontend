import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/Home/Home";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";
import MyPostStorage from "../../screens/MyPostStorage/MyPostStorage";

const Stack = createStackNavigator();

function UserScreenNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyPostStorage" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WriteWorry" component={WriteWorry} />
        <Stack.Screen name="MyPostStorage" component={MyPostStorage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
