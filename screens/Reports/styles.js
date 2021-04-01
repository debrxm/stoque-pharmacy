import { Dimensions, StyleSheet } from "react-native";
import { colors, cxlxrs } from "../../constants/Colors";
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
    paddingHorizontal: 10,
    paddingRight: 20,
    minHeight: 80,
    backgroundColor: cxlxrs.white,
    justifyContent: "space-between",
  },
  routeTitle: {
    color: cxlxrs.black,
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: "Roboto-Regular",
  },
  recentReports: {
    marginVertical: 10,
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
  sectionLabel: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5,
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraSemiBold,
  },

  recentReportPreview: {
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

  reportDate: {
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraMedium,
    fontSize: 16,
  },
  transactionSubtext: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemSold: {
    color: cxlxrs.textColor,
    fontFamily: FontFamily.FiraBold,
    fontSize: 10,
  },
  transactionProductCount: {
    color: cxlxrs.textColor,
    fontFamily: FontFamily.FiraBold,
    fontSize: 10,
  },

  income: {
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraMedium,
    fontSize: 13,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  dateSelector: {
    backgroundColor: "#ffffff",
    height: 40,
    width: "60%",
  },
  dateSelectorText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.black,
  },
  noInvestment: {
    alignItems: "center",
    minHeight: 100,
    marginVertical: 20,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 13,
    color: "#97989A",
    marginVertical: 20,
    fontFamily: "FiraCode-Regular",
    letterSpacing: 0.5,
  },
});
