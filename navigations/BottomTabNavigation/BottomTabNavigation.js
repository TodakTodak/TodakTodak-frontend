import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../screens/Home/Home";
import Friends from "../../screens/Friends/Friends";
import MyPostStorage from "../../screens/MyPostStorage/MyPostStorage";
import CounselingCenter from "../../screens/CounselingCenter/CounselingCenter";

import home from "../../assets/pngs/home.png";
import friends from "../../assets/pngs/friends.png";
import letter from "../../assets/pngs/letter.png";
import love from "../../assets/pngs/love.png";

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      tabBarOptions={{
        activeTintColor: "#e91e63"
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Image source={home} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: "Friends",
          tabBarIcon: () => (
            <Image source={friends} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name="MyPostStorage"
        component={MyPostStorage}
        options={{
          tabBarLabel: "MyPostStorage",
          tabBarIcon: () => (
            <Image source={letter} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name="CounselingCenter"
        component={CounselingCenter}
        options={{
          tabBarLabel: "CounselingCenter",
          tabBarIcon: () => (
            <Image source={love} style={styles.imageStyle} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 30,
    height: 30
  }
});

export default BottomTabNavigation;
