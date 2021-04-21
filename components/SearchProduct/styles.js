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
  flexGrouping: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 70,
    paddingHorizontal: 10,
  },
  cardInfoSub: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfoName: {
    color: cxlxrs.black,
    fontFamily: "FiraCode-Medium",
    fontSize: 16,
    alignSelf: "center",
  },
  cardInfoPrice: {
    color: cxlxrs.textColor,
    fontFamily: "FiraCode-Bold",
    fontSize: 18,
    alignSelf: "center",
  },
  cardInfoSub: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardInfoSubText: {
    marginBottom: -2,
    color: cxlxrs.textColor,
    fontFamily: "FiraCode-SemiBold",
    fontSize: 12,
    marginVertical: 10,
  },
  addBtn: {
    backgroundColor: cxlxrs.black,
    borderRadius: 30,
    height: 40,
    width: "94%",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  addBtnText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.white,
  },
});
