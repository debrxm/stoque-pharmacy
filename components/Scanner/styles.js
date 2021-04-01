import { StyleSheet } from "react-native";
import { cxlxrs } from "../../constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: cxlxrs.inactiveTintColor,
    alignItems: "center",
    // justifyContent: "center",
  },
  codeContainer: {
    borderRadius: 20,
    backgroundColor: "#ecf2fa",
    elevation: 4,
    margin: 10,
    padding: 20,
  },
  otherControl: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    // justifyContent: "space-between",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    textAlign: "center",
    color: "#424242",
    borderRadius: 25,
  },
});
