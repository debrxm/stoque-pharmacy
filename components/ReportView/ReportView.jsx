import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";
import AppButton from "../AppButton/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { FontFamily } from "../../constants/Fonts";
import TransactionPreview from "../TransactionPreview/TransactionPreview";
const ReportView = ({ reportViewVisible, setReportViewVisible, date }) => {
  const user = useSelector(({ user }) => user.currentUser);
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
  const getSalesReportData = async () => {
    console.log(date);
    const salesRef = firestore
      .collection("sales")
      .doc(user.id)
      .collection("sales")
      .where("day_created", "==", `${date}`);
    const snapshot = await salesRef.get();
    if (snapshot.empty) {
      setNoData(true);
      setIsLoading(false);
      return;
    }
    const transactionArr = [];
    snapshot.docs.forEach((item) => {
      transactionArr.push(item.data());
    });
    setReportData(transactionArr);
    setIsLoading(false);
  };
  useEffect(() => {
    getSalesReportData();
  }, [date]);
  return (
    <Modal
      animationType="fade"
      transparent={false}
      statusBarTranslucent={true}
      visible={reportViewVisible}
      onRequestClose={() => {}}
    >
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
            onPress={() => setReportViewVisible(false)}
          >
            <Ionicons name="close" size={20} color={cxlxrs.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReportView;
