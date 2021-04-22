import { Dimensions, StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cxlxrs.white,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    minHeight: 80,
    backgroundColor: cxlxrs.white,
    justifyContent: "space-between",
  },
  routeTitle: {
    color: cxlxrs.black,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: FontFamily.FiraMedium,
  },
  shopInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  shopName: {
    color: cxlxrs.black,
    textAlign: "center",
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: -2,
    letterSpacing: 1,
    fontFamily: "FiraCode-SemiBold",
  },
  invoiceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    minHeight: 60,
  },
  infoLightText: {
    fontSize: 12,
    color: "#97989A",
    fontFamily: FontFamily.FiraBold,
  },
  infoBoldText: {
    fontSize: 16,
    color: "#353535",
    fontFamily: "FiraCode-Regular",
  },
  infoName: {},
  infoId: {},
  section: {
    marginTop: 20,
    width: "100%",
  },
  sectionTitle: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontSize: 14,
    textAlign: "left",
    marginBottom: 5,
    color: cxlxrs.black,
    fontFamily: FontFamily.FiraSemiBold,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  tableText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.black,
    width: (Dimensions.get("window").width - 20) / 4,
    textAlign: "right",
  },
  tableTextLong: {
    textAlign: "left",
    width: (Dimensions.get("window").width - 20) / 2,
  },
  tableBodyText: {
    fontFamily: FontFamily.FiraRegular,
  },
  tableFooter: {
    marginTop: 30,
  },
  tableSubFooter: {
    marginTop: 0,
  },
  addBtn: {
    backgroundColor: cxlxrs.white,
    borderRadius: 30,
    height: 40,
    width: "90%",
  },
  addBtnText: {
    fontFamily: FontFamily.FiraBold,
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 12,
    color: cxlxrs.black,
  },
  iconContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
  },
  button: {
    flexDirection: "row",
    backgroundColor: cxlxrs.black,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
