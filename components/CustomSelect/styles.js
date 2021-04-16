import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";

export const styles = StyleSheet.create({
  selectContainer: {
    backgroundColor: "transparent",
    width: "90%",
  },
  label: {
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraBold,
    fontSize: 12,
    marginLeft: 5,
  },
});
