import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import Scanner from "../../components/Scanner/Scanner";
import { cxlxrs } from "../../constants/Colors";

import { styles } from "./styles";

const Products = () => {
  const navigation = useNavigation();
  const [hasProduct] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.routeTitle}>Inventory</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => setScannerVisible(true)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                width: 40,
              }}
            >
              <MaterialCommunityIcons
                name="barcode-scan"
                size={18}
                color={cxlxrs.textColor}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                width: 40,
              }}
            >
              <Feather name="search" size={18} color={cxlxrs.textColor} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Scanner
        scannerVisible={scannerVisible}
        setScannerVisible={setScannerVisible}
        quickScan
      />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        {hasProduct ? (
          <View style={styles.overview}>
            <View style={styles.overviewMainTextsContainer}>
              <Text style={styles.overviewMainTextLabel}>Total</Text>
              <Text style={styles.overviewMainTextBold}>{`0`}</Text>
            </View>
            <View style={styles.navButtons}>
              <AppButton
                onPress={() => navigation.navigate("TopUp")}
                title="All"
                customStyle={styles.navBtn}
                textStyle={{ ...styles.navBtnText, color: cxlxrs.black }}
              />
              <AppButton
                onPress={() => navigation.navigate("Products")}
                title="Running Low"
                customStyle={{
                  ...styles.navBtn,
                  backgroundColor: cxlxrs.white,
                }}
                textStyle={{
                  ...styles.navBtnText,
                }}
              />
              <AppButton
                onPress={() => navigation.navigate("Products")}
                title="Sold Out"
                customStyle={{
                  ...styles.navBtn,
                  backgroundColor: cxlxrs.white,
                }}
                textStyle={{
                  ...styles.navBtnText,
                }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.noProduct}>
            <Text style={[styles.noDataText, styles.noProductText]}>
              You currently have no product.
            </Text>
            <AppButton
              onPress={() => navigation.navigate("AddProduct")}
              title="Add Product"
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
        <TouchableOpacity onPress={() => navigation.navigate("AddProduct")}>
          <View style={styles.button}>
            <Ionicons name="add" size={24} color={cxlxrs.white} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Products;
