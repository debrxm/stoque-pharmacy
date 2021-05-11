import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";

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
    paddingRight: 20,
    minHeight: 80,
    backgroundColor: cxlxrs.white,
    justifyContent: "space-between",
  },
  routeTitle: {
    color: cxlxrs.black,
    fontSize: 14,
    letterSpacing: 1,
  },
  noData: {
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
