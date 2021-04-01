import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  bgStyle: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  head: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headText: {
    fontSize: 22,
    fontFamily: "FiraCode-Regular",
    textAlign: "center",
  },
  headSubText: {
    fontSize: 14,
    fontFamily: "FiraCode-Regular",
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    marginHorizontal: 20,
    borderRadius: 25,
  },
  inputGroupIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 25,
  },
  btns: {
    alignItems: "center",
    marginTop: 10,
  },
  btn: {
    padding: 20,
    width: "90%",
    borderRadius: 30,
  },
});
