import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cxlxrs.black,
    padding: 20,
    alignItems: "center",
    paddingTop: 50,
  },
  header: {},
  modal: {
    flex: 1,
  },
  payUpTexts: {
    paddingVertical: 20,
  },
  payUpTextBold: {
    // textTransform: "uppercase",
    letterSpacing: 1,
    color: cxlxrs.white,
    textAlign: "center",
    fontFamily: FontFamily.FiraSemiBold,
    fontSize: 22,
  },
  feature: {
    marginVertical: 10,
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  featureTitle: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 20,
    color: cxlxrs.white,
    fontFamily: FontFamily.FiraSemiBold,
  },
  featureText: {
    textAlign: "center",
    color: cxlxrs.white,
    marginVertical: 10,
    fontFamily: FontFamily.FiraMedium,
    fontSize: 12,
    lineHeight: 5,
    paddingVertical: 10,
  },

  btnWrapper: {
    marginTop: "auto",
    marginBottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
