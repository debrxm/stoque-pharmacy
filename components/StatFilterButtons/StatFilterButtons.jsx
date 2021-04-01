import React from "react";
import { View } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";
import { styles } from "./styles";
const StatFilterButtons = ({ filter, setFilter, styl, getTopSelling }) => {
  return (
    <View style={styl}>
      <AppButton
        title={"This Week"}
        customStyle={
          filter === "thisWeek"
            ? { ...styles.btn, backgroundColor: cxlxrs.white, marginRight: 10 }
            : {
                ...styles.btn,
                backgroundColor: "#ecf2fa",
                elvation: 5,
                marginRight: 10,
              }
        }
        textStyle={{
          fontSize: 12,
          color: cxlxrs.black,
          fontFamily: FontFamily.FiraSemiBold,
          textTransform: "capitalize",
          fontWeight: "200",
        }}
        onPress={() => {
          setFilter("thisWeek");
          getTopSelling && getTopSelling("thisWeek");
        }}
      />
      <AppButton
        title={"This Month"}
        customStyle={
          filter === "thisMonth"
            ? { ...styles.btn, backgroundColor: cxlxrs.white }
            : { ...styles.btn, backgroundColor: "#ecf2fa", elvation: 5 }
        }
        textStyle={{
          fontSize: 12,
          color: cxlxrs.black,
          fontFamily: FontFamily.FiraSemiBold,
          textTransform: "capitalize",
          fontWeight: "200",
        }}
        onPress={() => {
          setFilter("thisMonth");
          getTopSelling && getTopSelling("thisMonth");
        }}
      />
    </View>
  );
};

export default StatFilterButtons;
