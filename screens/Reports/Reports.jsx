import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import ReportGraph from "../../components/ReportGraph/ReportGraph";

import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";

const Reports = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(Date.now().toString());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {}, []);
  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleConfirmDate = (date) => {
    console.log(date);
    const timeString = new Date(date).toISOString();
    const year = timeString.getFullYear();
    const month = timeString.getMonth();
    const day = timeString.getDay();
    const newDate = `${year}-${month}-${day}`;

    setDate(newDate);
    setDatePickerVisibility(!isDatePickerVisible);
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

          <TouchableWithoutFeedback>
            <View style={styles.recentReportPreview}>
              <View style={styles.left}>
                <Text style={styles.reportDate}>Yesterday</Text>
                <Text style={styles.itemSold}>{40} product sold</Text>
              </View>
              <Text style={styles.income}>{`₦40,000`}</Text>
            </View>
          </TouchableWithoutFeedback>
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
