import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PickerSelect from "react-native-picker-select";

import { NANUM_REGULAR } from "../../constants/font";

function Picker({ handleChange, itemList, label }) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>
        {label}
      </Text>
      <View style={styles.selector}>
        <PickerSelect
          onValueChange={(value) => handleChange(value)}
          items={itemList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    width: "100%"
  },
  pickerLabel: {
    position: "absolute",
    left: 20,
    top: 10,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: NANUM_REGULAR
  },
  selector: {
    width: "90%",
    height: 35,
    backgroundColor: "#ffffff",
    marginTop: 40,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    padding: 10,
    borderRadius: 10
  }
});

export default Picker;
