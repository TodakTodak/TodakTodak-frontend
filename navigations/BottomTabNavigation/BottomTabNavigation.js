import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Friends from "../../screens/Friends/Friends";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";
import UserInfoRoom from "../../screens/UserInfoRoom/UserInfoRoom";
import MyPostStorage from "../../screens/MyPostStorage/MyPostStorage";
import CounselingCenter from "../../screens/CounselingCenter/CounselingCenter";

import {
  FRIENDS,
  WRITEWORRY,
  USERINFOROOM,
  FRIENDSLABEL,
  MYPOSTSTORAGE,
  WRITEWORRYLABEL,
  COUNSELINGCENTER,
  USERINFOROOMLABEL,
  MYPOSTSTORAGELABEL,
  COUNSELINGCENTERLABEL
} from "../../constants/navigationName";

import love from "../../assets/pngs/love.png";
import letter from "../../assets/pngs/letter.png";
import friends from "../../assets/pngs/friends.png";
import feather from "../../assets/pngs/feather.png";
import userInfoRoom from "../../assets/pngs/home.png";

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={MYPOSTSTORAGE}
      tabBarOptions={{
        activeTintColor: "#e91e63"
      }}
    >
      <Tab.Screen
        name={USERINFOROOM}
        component={UserInfoRoom}
        options={{
          tabBarLabel: USERINFOROOMLABEL,
          tabBarIcon: () => (
            <Image source={userInfoRoom} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={MYPOSTSTORAGE}
        component={MyPostStorage}
        options={{
          tabBarLabel: MYPOSTSTORAGELABEL,
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
        name={COUNSELINGCENTER}
        component={CounselingCenter}
        options={{
          tabBarLabel: COUNSELINGCENTERLABEL,
          tabBarIcon: () => (
            <Image source={love} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={WRITEWORRY}
        component={WriteWorry}
        initialParams={{ postInfo: {} }}
        options={{
          tabBarLabel: WRITEWORRYLABEL,
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

export default BottomTabNavigation;
