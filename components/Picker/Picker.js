import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PickerSelect from "react-native-picker-select";

import { BLACK, WHITE } from "../../constants/color";

function Picker({
  label,
  value,
  itemList,
  handleChange
}) {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>
        {label}
      </Text>
      <View style={styles.selector}>
        <PickerSelect
          value={value}
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
    color: BLACK,
    fontWeight: "bold",
    fontSize: 20
  },
  selector: {
    width: "90%",
    height: 35,
    backgroundColor: WHITE,
    marginTop: 40,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    padding: 10,
    borderRadius: 10
  }
});

export default Picker;
