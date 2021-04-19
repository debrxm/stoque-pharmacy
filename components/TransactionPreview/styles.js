import { Dimensions, StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";
export const styles = StyleSheet.create({
  transaction: {
    width: Dimensions.get("screen").width - 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    backgroundColor: cxlxrs.white,
    elevation: 2,
    marginBottom: 20,
  },
  transactionIcon: { width: 20 },
  transactionTexts: {
    width: Dimensions.get("screen").width - 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionTextLeft: {
    flex: 1,
  },
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
