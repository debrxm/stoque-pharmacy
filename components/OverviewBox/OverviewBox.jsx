import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Text, View } from "../Themed/Themed";
import { styles } from "./styles";

const OverviewBox = ({ onPress, icon, count, label, bgColor, textColor }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.overviewBox, { backgroundColor: bgColor }]}>
        {icon}
        <Text
          style={[
            styles.overviewBoxText,
            styles.overviewBoxCount,
            { color: textColor },
          ]}
        >
          {count}
        </Text>
        <Text
          style={[
            styles.overviewBoxText,
            styles.overviewBoxLabel,
            { color: textColor },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OverviewBox;
