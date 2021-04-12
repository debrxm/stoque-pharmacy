import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: cxlxrs.inactiveTintColor,
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  closeBtn: {
    backgroundColor: "#ffffff",
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: cxlxrs.black,
    borderRadius: 30,
    height: 40,
    width: "70%",
  },
  addBtnText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.white,
  },
});
