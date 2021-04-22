import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: cxlxrs.black,
    elevation: 3,
  },
  boldText: {
    fontSize: 13,
    color: "#ffffff",
    fontFamily: FontFamily.FiraSemiBold,
  },
  lightText: {
    fontSize: 10,
    color: cxlxrs.white,
    fontFamily: FontFamily.FiraRegular,
    marginVertical: 5,
  },
  time: {
    fontSize: 8,
    color: cxlxrs.white,
    fontFamily: FontFamily.FiraRegular,
  },
});
