import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserInfoRoom from "../../screens/UserInfoRoom/UserInfoRoom";
import Friends from "../../screens/Friends/Friends";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";
import MyPostStorage from "../../screens/MyPostStorage/MyPostStorage";
import CounselingCenter from "../../screens/CounselingCenter/CounselingCenter";

import userInfoRoom from "../../assets/pngs/home.png";
import love from "../../assets/pngs/love.png";
import letter from "../../assets/pngs/letter.png";
import friends from "../../assets/pngs/friends.png";
import feather from "../../assets/pngs/feather.png";

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="MyPostStorage"
      tabBarOptions={{
        activeTintColor: "#e91e63"
      }}
    >
      <Tab.Screen
        name="UserInfoRoom"
        component={UserInfoRoom}
        options={{
          tabBarLabel: "내 정보",
          tabBarIcon: () => (
            <Image source={userInfoRoom} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name="MyPostStorage"
        component={MyPostStorage}
        options={{
          tabBarLabel: "내 마음 저장소",
          tabBarIcon: () => (
            <Image source={letter} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: "나의 인연들",
          tabBarIcon: () => (
            <Image source={friends} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name="CounselingCenter"
        component={CounselingCenter}
        options={{
          tabBarLabel: "고민 상담소",
          tabBarIcon: () => (
            <Image source={love} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name="WriteWorry"
        component={WriteWorry}
        options={{
          tabBarLabel: "글 쓰기",
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
    width: 30,
    height: 30
  }
});

export default BottomTabNavigation;
