import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import { cxlxrs } from "../../constants/Colors";

import { styles } from "./styles";

const Bonus = () => {
  const navigation = useNavigation();
  const [hasInvestment] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 60 }}
            >
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={cxlxrs.white}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>Bonuses</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View style={styles.wallet}>
          <View style={styles.walletMainTextsContainer}>
            <Text style={styles.walletMainTextBold}>{`₦ ${"00.00"}`}</Text>
          </View>
          <View style={styles.walletButtons}>
            <AppButton
              onPress={() => navigation.navigate("TopUp")}
              title="Invest"
              customStyle={styles.walletBtn}
              textStyle={{
                fontFamily: "FiraCode-SemiBold",
                textTransform: "capitalize",
                fontWeight: "400",
                fontSize: 12,
              }}
            />
            <AppButton
              onPress={() => navigation.navigate("")}
              title="Cash Out"
              customStyle={{
                ...styles.walletBtn,
                backgroundColor: cxlxrs.white,
              }}
              textStyle={{
                fontFamily: "FiraCode-SemiBold",
                textTransform: "capitalize",
                fontWeight: "400",
                fontSize: 12,
                color: cxlxrs.tint,
              }}
            />
          </View>
        </View>
        {!hasInvestment && (
          <View style={styles.noInvestment}>
            <Text style={[styles.noDataText, styles.noInvestmentText]}>
              You currently have no invetsment.
            </Text>
            <AppButton
              onPress={() => navigation.navigate("Products")}
              title="Start Investing"
              customStyle={{
                ...styles.walletBtn,
                backgroundColor: cxlxrs.white,
              }}
              textStyle={{
                fontFamily: "FiraCode-Regular",
                textTransform: "capitalize",
                fontWeight: "400",
                fontSize: 12,
                color: cxlxrs.tint,
              }}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Bonus;
