import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";
export const styles = StyleSheet.create({
  productCard: {
    marginHorizontal: 10,
    position: "relative",
    backgroundColor: "#ffffff",
    elevation: 3,
    borderRadius: 60,
    padding: 5,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingRight: 20,
  },
  productIconContainer: {
    backgroundColor: cxlxrs.white,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: cxlxrs.white,
    borderWidth: 2,
  },
  cardInfo: {
    paddingLeft: 20,
    flex: 1,
  },
  cardInfoSub: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfoName: {
    color: cxlxrs.black,
    fontFamily: "FiraCode-SemiBold",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: -5,
  },
  cardInfoSubText: {
    marginBottom: -2,
    color: cxlxrs.textColor,
    fontFamily: "FiraCode-SemiBold",
    fontSize: 11,
    marginVertical: 10,
    marginRight: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
