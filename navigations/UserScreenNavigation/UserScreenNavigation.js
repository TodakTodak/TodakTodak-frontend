import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/Home/Home";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";

const Stack = createStackNavigator();

function UserScreenNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WriteWorry" component={WriteWorry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
