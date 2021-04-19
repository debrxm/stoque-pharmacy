import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { cxlxrs } from "../../constants/Colors";
import AppButton from "../../components/AppButton/AppButton";
import { FontFamily } from "../../constants/Fonts";
import TransactionPreview from "../../components/TransactionPreview/TransactionPreview";
import { styles } from "./styles";
const ReportView = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ revenue: 0, count: 0 });
  const [reportData, setReportData] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const getSalesReportData = async () => {
    const timeString = route.params.timeString;
    const salesRef = firestore
      .collection("sales")
      .doc(user.id)
      .collection("sales")
      .where("day_created", "==", `${timeString}`);
    const snapshot = await salesRef.get();
    if (snapshot.empty) {
      setNoData(true);
      setIsLoading(false);
      return;
    }
    const transactionArr = [];
    let revenue = 0,
      count = 0;
    snapshot.docs.forEach((item) => {
      const data = item.data();
      transactionArr.push(data);
      revenue += data.price;
      count += data.quantity;
    });
    setReportData(transactionArr);
    setStats({ revenue, count });
    setIsLoading(false);
  };
  useEffect(() => {
    getSalesReportData();
  }, [""]);
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
                color={cxlxrs.black}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>{route.params.timeString}</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
          backgroundColor: cxlxrs.white,
          flex: 1,
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={cxlxrs.black}
            style={{ marginBottom: 10 }}
          />
        ) : noData ? (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.listContainer}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: FontFamily.FiraMedium,
                  paddingTop: 50,
                }}
              >
                No data for this day
              </Text>
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.overview}>
              <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
                <View style={styles.overviewRevenue}>
                  <Text style={styles.overviewLightText}>Revenue</Text>
                  <Text style={styles.overviewBoldText}>₦{stats.revenue}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Bonus")}>
                <View style={styles.overviewProductSold}>
                  <Text style={styles.overviewLightText}>Product Sold</Text>
                  <Text style={styles.overviewBoldText}>{stats.count}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={reportData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <TransactionPreview data={item} />}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                style={{ paddingBottom: 20 }}
                initialNumToRender={15}
              />
            </View>
          </SafeAreaView>
        )}
        <View style={styles.bottomContainer}>
          <AppButton
            onPress={() => {}}
            title="Print"
            customStyle={styles.addBtn}
            textStyle={styles.addBtnText}
          />
          <TouchableOpacity
            style={[styles.closeBtn]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={20} color={cxlxrs.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ReportView;
