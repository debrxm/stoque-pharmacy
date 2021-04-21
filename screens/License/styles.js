import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cxlxrs.white,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 20,
    minHeight: 80,
    backgroundColor: cxlxrs.white,
    justifyContent: "space-between",
  },
  routeTitle: {
    color: cxlxrs.black,
    fontSize: 14,
    letterSpacing: 1,
  },
  circles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progress: {
    margin: 10,
  },
  addBtn: {
    backgroundColor: cxlxrs.black,
    borderRadius: 30,
    height: 40,
    width: "90%",
  },
  addBtnText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.white,
  },
});
