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
  codeContainer: {
    borderRadius: 20,
    backgroundColor: "#ecf2fa",
    elevation: 4,
    margin: 10,
    padding: 20,
  },
  otherControl: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    textAlign: "center",
    color: "#424242",
    borderRadius: 25,
  },
  productIconContainer: {
    backgroundColor: cxlxrs.black,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    alignSelf: "center",
  },
  cardInfo: {
    marginTop: 10,
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
    lineHeight: 20,
    marginBottom: -5,
    alignSelf: "center",
  },
  cardInfoPrice: {
    color: cxlxrs.textColor,
    fontFamily: "FiraCode-Bold",
    fontSize: 18,
    // lineHeight: 20,
    alignSelf: "center",
    marginTop: 10,
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
    width: "100%",
    marginVertical: 10,
  },
  addBtnText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.white,
  },
});
