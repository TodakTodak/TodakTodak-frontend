import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../../screens/Intro/Intro";
import Login from "../../screens/Login/Login";
import Signup from "../../screens/Signup/Signup";
import Home from "../../screens/Home/Home";

const Stack = createStackNavigator();

function AuthStackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" headerMode="none">
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStackNavigation;
