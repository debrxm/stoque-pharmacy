import { StyleSheet } from "react-native";
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
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 80,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
  routeTitle: {
    color: cxlxrs.black,
    fontSize: 16,
    letterSpacing: 1,
  },
  userPreview: {
    alignItems: "center",
  },
  userImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },
  usernameContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  adminText: {
    fontSize: 16,
    color: "#353535",
    fontFamily: "FiraCode-Regular",
  },
  username: {
    color: "#42414C",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    marginLeft: -2,
    letterSpacing: 1,
    fontFamily: "FiraCode-SemiBold",
  },
  modalTextButton: {
    marginVertical: 3,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  modalText: {
    color: "#111111",
    fontSize: 14,
    fontFamily: "FiraCode-Regular",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: 100,
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
  infoName: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoId: {
    justifyContent: "center",
    alignItems: "center",
  },
  settings: {
    marginTop: 30,
  },
  completeSetup: {
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 40,
    padding: 10,
    position: "relative",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: "auto",
  },
  icon: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  completeSetupTexts: {
    marginLeft: 10,
  },
  completeSetupTextMain: {
    fontFamily: "FiraCode-SemiBold",
    fontSize: 12,
    textAlign: "center",
  },
  completeSetupTextSub: {
    fontFamily: "FiraCode-Regular",
    letterSpacing: 0.05,
    fontSize: 12,
    justifyContent: "center",
  },
  completeSetupTextBold: {
    fontFamily: FontFamily.FiraBold,
    fontSize: 10,
    color: cxlxrs.textColor,
  },
});
