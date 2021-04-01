import { Dimensions, StyleSheet } from "react-native";
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
    paddingBottom: 10,
    paddingHorizontal: 10,
    zIndex: 1,
    minHeight: 80,
    backgroundColor: cxlxrs.white,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    color: cxlxrs.black,
    fontFamily: "FiraCode-Regular",
  },
  imageContainer: {
    borderRadius: 25,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: cxlxrs.black,
  },
  profilePic: {
    width: 28,
    height: 28,
    borderRadius: 15,
  },
  noty: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  overviews: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  section: {
    marginVertical: 10,
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  sectionTitle: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5,
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraSemiBold,
  },
  transaction: {
    width: Dimensions.get("screen").width - 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    backgroundColor: cxlxrs.white,
    elevation: 3,
    marginTop: 10,
  },
  transactionIcon: { width: 20 },
  transactionTexts: {
    width: Dimensions.get("screen").width - 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionTextLeft: {},
  transactionName: {
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraMedium,
    fontSize: 13,
  },
  transactionSubtext: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionTime: {
    color: cxlxrs.textColor,
    fontFamily: FontFamily.FiraBold,
    fontSize: 10,
  },
  transactionProductCount: {
    color: cxlxrs.textColor,
    fontFamily: FontFamily.FiraBold,
    fontSize: 10,
  },
  transactionTextRight: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  transactionId: {
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraMedium,
    fontSize: 13,
  },
  transactionTotalPrice: {
    color: cxlxrs.textColor,
    fontFamily: FontFamily.FiraBold,
    fontSize: 10,
  },
});
