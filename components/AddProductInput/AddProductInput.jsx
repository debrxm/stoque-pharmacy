import React from "react";
import { TextInput } from "react-native";
import { Text, View } from "../Themed/Themed";
import { styles } from "./styles";

const AddProductInput = ({
  containerStyle,
  groupStyle,
  label,
  onChangeText,
  value,
  autoCapitalize,
  keyType,
  editable,
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputGroup, groupStyle]}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholderTextColor="#97989A"
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize || "none"}
          keyboardType={keyType || "default"}
          editable={editable}
          value={value}
        />
      </View>
    </View>
  );
};

export default AddProductInput;
