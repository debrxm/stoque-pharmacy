import React from "react";
import { Picker } from "@react-native-picker/picker";
import { cxlxrs } from "../../constants/Colors";

const CustomPicker = ({
  prompt,
  style,
  options,
  selectedValue,
  setSelectedValue,
}) => {
  return (
    <Picker
      prompt={prompt}
      selectedValue={selectedValue}
      style={{
        height: 50,
        width: "100%",
        borderBottomColor: "#000000",
        borderBottomWidth: 2,
        backgroundColor: "#ffffff",
        borderColor: "black",
        borderWidth: 3,
        ...style,
      }}
      onValueChange={(itemValue, itemIndex) => {
        setSelectedValue(itemValue);
      }}
      itemStyle={{
        fontSize: 5,
        color: "red",
      }}
    >
      {options.map((item, index) => (
        <Picker.Item key={index} label={item} value={item.toLowerCase()} />
      ))}
    </Picker>
  );
};

export default CustomPicker;
