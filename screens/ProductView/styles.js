import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cxlxrs.white,
    paddingHorizontal: 10,
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
  centerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  successtext: {
    color: cxlxrs.success,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: FontFamily.FiraMedium,
  },
  routeTitle: {
    color: cxlxrs.black,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: FontFamily.FiraMedium,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
    backgroundColor: cxlxrs.black,
    borderWidth: 0,
    borderRadius: 5,
  },
  flexGrouping: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectContainer: {
    backgroundColor: "transparent",
    width: "63%",
  },
  label: {
    color: cxlxrs.textColor,
    fontFamily: FontFamily.FiraBold,
    fontSize: 12,
    marginLeft: 5,
  },
  dateSelectorContainer: {
    backgroundColor: "transparent",
  },
  dateSelectorLabel: {
    color: cxlxrs.textColor,
    fontFamily: FontFamily.FiraBold,
    fontSize: 12,
    marginLeft: 5,
  },
  dateSelector: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    elevation: 0,
    height: 40,
    width: "60%",
    justifyContent: "flex-start",
  },
  dateSelectorText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.black,
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
  iconContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
