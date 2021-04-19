import { useNavigation } from "@react-navigation/core";
import React from "react";
import moment from "moment";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { styles } from "./styles";

export default function TransactionPreview({
  data,
  data: { id, price, created_at, day_created, quantity },
}) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback>
      <View style={styles.transaction}>
        <View style={styles.transactionTexts}>
          <View style={styles.transactionTextLeft}>
            <Text style={styles.transactionName}>{`${day_created}`}</Text>
            <View style={styles.transactionSubtext}>
              <Text style={styles.transactionTime}>
                {created_at ? moment(created_at).fromNow() : "10 min ago"}
              </Text>
              <Text style={styles.transactionProductCount}>
                {`${quantity || 0} Products`}
              </Text>
            </View>
          </View>
          <View style={styles.transactionTextRight}>
            <Text style={styles.transactionId}>#{id || "10ingo"}</Text>
            <Text style={styles.transactionTotalPrice}>{`₦${price ||
              "32,000"}`}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
