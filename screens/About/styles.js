import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 80,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
  routeTitle: {
    color: "#111111",
    fontSize: 16,
    letterSpacing: 1,
  },
  orgName: {
    textTransform: "uppercase",
    color: cxlxrs.black,
    textAlign: "center",
    fontFamily: "FiraCode-SemiBold",
    fontSize: 16,
  },
  descriptionText: {
    textAlign: "center",
    color: "#a6a5a2",
    marginVertical: 10,
    fontFamily: "FiraCode-Regular",
    fontSize: 13,
    lineHeight: 30,
    paddingVertical: 10,
  },
  readmore: {
    marginTop: "auto",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  readmoreText: {
    fontFamily: "FiraCode-SemiBold",
    backgroundColor: "#ffffff",
    color: cxlxrs.black,
    fontSize: 14,
  },
});
