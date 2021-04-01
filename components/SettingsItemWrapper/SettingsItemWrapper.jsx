import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors, cxlxrs } from "../../constants/Colors";

import styles from "./styles";

const SettingsItemWrapper = ({ title, icon, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.setting, style]}>
      <View style={styles.settingIcon}>{icon}</View>
      <Text style={styles.settingText}>{title}</Text>
      <View style={[styles.settingIcon, { marginLeft: "auto" }]}>
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={cxlxrs.black}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItemWrapper;
