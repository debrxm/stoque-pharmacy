import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  btns: {
    marginTop: "auto",
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
    backgroundColor: cxlxrs.black,
    borderRadius: 0,
    elevation: 0,
    margin: 0,
  },
  btnText: {
    fontFamily: "FiraCode-Regular",
    textTransform: "capitalize",
    fontWeight: "400",
    color: cxlxrs.white,
  },
});
