import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import { cxlxrs } from "../../constants/Colors";

import { styles } from "./styles";

const Cashiers = () => {
  const navigation = useNavigation();
  const [hasProduct] = useState(false);

  useEffect(() => {}, [""]);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.routeTitle}>Cashiers</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}></View>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        {hasProduct ? (
          <View style={styles.overview}></View>
        ) : (
          <View style={styles.noProduct}>
            <Text style={[styles.noDataText, styles.noProductText]}>
              You currently have no cashier.
            </Text>
            <AppButton
              onPress={() => navigation.navigate("AddCashier")}
              title="Add Cashier"
              customStyle={{
                backgroundColor: cxlxrs.white,
                borderRadius: 30,
                height: 35,
                width: "40%",
              }}
              textStyle={{
                fontFamily: "FiraCode-Regular",
                textTransform: "capitalize",
                fontWeight: "400",
                fontSize: 12,
                color: cxlxrs.black,
              }}
            />
          </View>
        )}
      </ScrollView>
      <View style={{ ...styles.buttonContainer }}>
        <TouchableOpacity onPress={() => navigation.navigate("AddCashier")}>
          <View style={styles.button}>
            <Ionicons name="add" size={24} color={cxlxrs.white} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Cashiers;
