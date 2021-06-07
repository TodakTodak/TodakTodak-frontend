/**
 * Component for seleting contents used by Picker.
 * When pressed, showing list and click element set value.
 *
 * @component
 *
 * @param {String} label The selected area title
 * @param {String} value Seleted Value default value is no selection
 * @param {Array} itemList List of seleting
 * @param {Function} handleChange When pressed, set value
 */

import React from "react";
import { Text, View } from "react-native";
import PickerSelect from "react-native-picker-select";

import styles from "./styles";

const Picker = ({
  label,
  value,
  itemList,
  handleChange
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>
        {label}
      </Text>
      <View style={styles.selector}>
        <PickerSelect
          value={value}
          items={itemList}
          onValueChange={(value) => handleChange(value)}
        />
      </View>
    </View>
  );
}

export default React.memo(Picker);
