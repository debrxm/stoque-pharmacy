import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    paddingTop: 100,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: cxlxrs.white,
    elevation: 3,
  },
  icon: {
    backgroundColor: cxlxrs.black,
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  boldText: {
    fontSize: 16,
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraSemiBold,
    marginBottom: 20,
  },
  lightText: {
    fontSize: 14,
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraRegular,
    marginVertical: 5,
  },
  time: {
    marginTop: "auto",
    fontSize: 10,
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraRegular,
  },
  okBtn: {
    backgroundColor: cxlxrs.black,
    borderRadius: 30,
    height: 40,
    width: "94%",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  okBtnText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.white,
  },
});
