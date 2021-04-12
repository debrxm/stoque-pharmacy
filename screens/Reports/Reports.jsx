import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ReportGraph from "../../components/ReportGraph/ReportGraph";

import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";
import { firestore } from "../../firebase/config";
import { useSelector } from "react-redux";

const Reports = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [hasData, setHasData] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [reportViewVisible, setReportViewVisible] = useState(false);
  const statsRef = firestore.collection("stats").doc(user.id);
  const fetchData = async () => {
    statsRef.onSnapshot((snapShot) => {
      if (!snapShot.exists) {
        // setIsReportLoading(false);
        return;
      }
      // setProductSold(snapShot.data().sold);
      // setIsReportLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleConfirmDate = (date) => {
    const timeString = new Date(date).toISOString().substring(0, 10);
    console.log(timeString);
    setDatePickerVisibility(!isDatePickerVisible);
    navigation.navigate("ReportView", { timeString });
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.routeTitle}>Reports</Text>
        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        </View> */}
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <ReportGraph />
        <View style={styles.recentReports}>
          <Text style={styles.sectionLabel}>Latest Reports</Text>

          {hasData ? (
            <TouchableWithoutFeedback>
              <View style={styles.recentReportPreview}>
                <View style={styles.left}>
                  <Text style={styles.reportDate}>Yesterday</Text>
                  <Text style={styles.itemSold}>{40} product sold</Text>
                </View>
                <Text style={styles.income}>{`₦40,000`}</Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                minHeight: 100,
              }}
            >
              <Text>No Data</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ ...styles.buttonContainer }}>
        <AppButton
          onPress={toggleDatePicker}
          title={"Pick a date"}
          customStyle={styles.dateSelector}
          textStyle={styles.dateSelectorText}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => handleConfirmDate(date)}
          onCancel={toggleDatePicker}
          isDarkModeEnabled={false}
          pickerContainerStyleIOS={{ backgroundColor: cxlxrs.black }}
        />
      </View>
    </>
  );
};

export default Reports;
