import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { cxlxrs } from "../../constants/Colors";

const size = 64;

export default function QRFooterButton({
  reScan,
  onPress,
  isActive,
  iconName,
  iconSize,
}) {
  const tint = isActive ? "default" : "dark";
  const iconColor = isActive ? cxlxrs.black : "#ffffff";

  const onPressButton = React.useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity onPress={onPressButton}>
      <BlurView
        intensity={500}
        style={[styles.container]}
        tint={reScan ? "light" : tint}
      >
        <Ionicons
          name={iconName}
          size={iconSize}
          color={reScan ? cxlxrs.black : iconColor}
        />
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    overflow: "hidden",
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
