import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Friends from "../../screens/Friends/Friends";
import WRITE_WORRY from "../../screens/WRITE_WORRY/WRITE_WORRY";
import USER_INFO_ROOM from "../../screens/USER_INFO_ROOM/USER_INFO_ROOM";
import MY_POST_STORAGE from "../../screens/MY_POST_STORAGE/MY_POST_STORAGE";
import COUNSELING_CENTER from "../../screens/COUNSELING_CENTER/COUNSELING_CENTER";

import {
  FRIENDS,
  WRITE_WORRY,
  USER_INFO_ROOM,
  FRIENDSLABEL,
  MY_POST_STORAGE,
  WRITE_WORRYLABEL,
  COUNSELING_CENTER,
  USER_INFO_ROOMLABEL,
  MY_POST_STORAGELABEL,
  COUNSELING_CENTERLABEL
} from "../../constants/navigationName";

import love from "../../assets/pngs/love.png";
import letter from "../../assets/pngs/letter.png";
import friends from "../../assets/pngs/friends.png";
import feather from "../../assets/pngs/feather.png";
import USER_INFO_ROOM from "../../assets/pngs/home.png";

const Tab = createBottomTabNavigator();

function BOTTOM_TAB_NAVIGATION() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={MY_POST_STORAGE}
      tabBarOptions={{
        activeTintColor: "#e91e63"
      }}
    >
      <Tab.Screen
        name={USER_INFO_ROOM}
        component={USER_INFO_ROOM}
        options={{
          tabBarLabel: USER_INFO_ROOMLABEL,
          tabBarIcon: () => (
            <Image source={USER_INFO_ROOM} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={MY_POST_STORAGE}
        component={MY_POST_STORAGE}
        options={{
          tabBarLabel: MY_POST_STORAGELABEL,
          tabBarIcon: () => (
            <Image source={letter} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={FRIENDS}
        component={Friends}
        options={{
          tabBarLabel: FRIENDSLABEL,
          tabBarIcon: () => (
            <Image source={friends} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={COUNSELING_CENTER}
        component={COUNSELING_CENTER}
        options={{
          tabBarLabel: COUNSELING_CENTERLABEL,
          tabBarIcon: () => (
            <Image source={love} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={WRITE_WORRY}
        component={WRITE_WORRY}
        initialParams={{ postInfo: {} }}
        options={{
          tabBarLabel: WRITE_WORRYLABEL,
          tabBarIcon: () => (
            <Image source={feather} style={styles.imageStyle} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 25,
    height: 25
  }
});

export default BOTTOM_TAB_NAVIGATION;
