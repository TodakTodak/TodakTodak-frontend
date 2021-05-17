import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";

import { WHITE } from "../../constants/color";

import emptyBox from "../../assets/pngs/emptyBox.png";

const EmptyView = ({ text, viewStyle }) => {
  return (
    <View style={[styles.emptyContainer, viewStyle]}>
      <Image source={emptyBox} style={styles.emptyBoxImage} />
      <Text style={styles.emptyText}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    marginTop: "40%"
  },
  emptyBoxImage: {
    width: 100,
    height: 100
  },
  emptyText: {
    marginTop: 20,
    color: WHITE,
    fontSize: 20
  }
});

export default EmptyView;
