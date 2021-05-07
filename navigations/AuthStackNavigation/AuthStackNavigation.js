import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../../screens/Intro/Intro";
import Login from "../../screens/Login/Login";
import Signup from "../../screens/Signup/Signup";

const Stack = createStackNavigator();

function AuthStackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" headerMode="none">
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStackNavigation;
