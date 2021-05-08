import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/Home/Home";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";
import DetailPost from "../../screens/DetailPost/DetailPost";
import MyPostStorage from "../../screens/MyPostStorage/MyPostStorage";
import CounselingCenter from "../../screens/CounselingCenter/CounselingCenter"

const Stack = createStackNavigator();

function UserScreenNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WriteWorry" component={WriteWorry} />
        <Stack.Screen name="DetailPost" component={DetailPost} />
        <Stack.Screen name="MyPostStorage" component={MyPostStorage} />
        <Stack.Screen name="CounselingCenter" component={CounselingCenter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
