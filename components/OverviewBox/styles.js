import { Dimensions, StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";

export const styles = StyleSheet.create({
  overviewBox: {
    width: Dimensions.get("screen").width / 3 - 20,
    height: Dimensions.get("screen").width / 3 - 30,
    borderRadius: 10,
    backgroundColor: cxlxrs.tint,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    padding: 10,
  },
  overviewBoxText: {
    color: cxlxrs.white,
    marginTop: "auto",
    fontFamily: "FiraCode-Regular",
    fontSize: 12,
  },
  overviewBoxCount: {
    fontFamily: "FiraCode-SemiBold",
    fontSize: 16,
  },
});
