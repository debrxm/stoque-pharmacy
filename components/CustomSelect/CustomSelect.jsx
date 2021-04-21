import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { FontFamily } from "../../constants/Fonts";
import { styles } from "./styles";
const CustomSelect = ({
  disabled,
  options,
  value,
  onValueChange,
  label,
  labelStyle,
  containerStyle,
}) => {
  const user = useSelector(({ user }) => user.currentUser);
  useEffect(() => {}, [value]);
  return (
    <View style={[styles.selectContainer, { ...containerStyle }]}>
      {label ? (
        <Text style={[styles.label, { ...labelStyle }]}>{label}</Text>
      ) : null}
      <RNPickerSelect
        onValueChange={(val) => onValueChange(val)}
        items={options}
        style={pickerSelectStyles}
        disabled={disabled}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <AntDesign
            name="caretdown"
            size={10}
            color="black"
            style={{ marginTop: 15, marginRight: 10 }}
          />
        )}
      />
    </View>
  );
};

export default CustomSelect;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "#fff",
    fontFamily: FontFamily.FiraMedium,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "#fff",
    fontFamily: FontFamily.FiraMedium,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
