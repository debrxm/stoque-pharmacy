import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import { cxlxrs } from "../../constants/Colors";
import { styles } from "./styles";

export default function NotificationPreview({
  data,
  setNotificationDate,
  setNotyVisible,
  data: { title, message, created_at, viewed },
}) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setNotificationDate(data);
          setNotyVisible(true);
        }}
        activeOpacity={0.7}
        style={{
          width: "100%",
          marginVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            ...styles.container,
            backgroundColor: viewed ? "#ffffff" : cxlxrs.black,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...styles.boldText,
                color: viewed ? cxlxrs.black : "#ffffff",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                ...styles.lightText,
                color: viewed ? cxlxrs.textColor : cxlxrs.white,
              }}
            >
              {message}
            </Text>
            <Text
              style={{
                ...styles.time,
                color: viewed ? cxlxrs.textColor : cxlxrs.white,
              }}
            >
              {moment(created_at).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
