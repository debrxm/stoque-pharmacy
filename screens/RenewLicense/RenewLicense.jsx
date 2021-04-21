import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PayWithPaystack from "../../components/PayWithPaystack/PayWithPaystack";

import { styles } from "./styles";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { GetExpirationDate } from "../../utils/helper";
import { Features } from "../../constants/features";
import { cxlxrs } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/core";

const RenewLicense = ({ type, canClose }) => {
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState("0");
  const [expireDate, setExpireDate] = useState(null);
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();
  const onSelectDuration = (category) => {
    // const expirationDate = GetExpirationDate(category || 0);
    category && setExpireDate(GetExpirationDate(category));
    if (category === 1) {
      setAmount(2500);
    } else if (category === 6) {
      setAmount(14250);
    } else {
      setAmount(27000);
    }
  };
  useEffect(() => {
    onSelectDuration(category);
  }, [category]);
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      statusBarTranslucent={true}
      style={styles.modal}
      onRequestClose={() => {}}
    >
      {canClose && (
        <TouchableOpacity
          style={[
            {
              position: "absolute",
              top: 20,
              right: 10,
              backgroundColor: cxlxrs.white,
              zIndex: 10,
              height: 40,
              width: 40,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={20} color={cxlxrs.danger} />
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        {/* <Image resizeMode={"contain"} source={me} style={styles.me} /> */}
        <View style={styles.payUpTexts}>
          <Text style={styles.payUpTextBold}>
            {type === "subscribe" ? `Subscribe Now` : `Renew Subsciption`}
          </Text>
        </View>
        <CustomSelect
          label="Select Duration"
          labelStyle={{
            textAlign: "center",
            margin: 0,
            marginBottom: 10,
            fontSize: 13,
            color: cxlxrs.white,
          }}
          options={[
            { label: "1 month ₦2500", value: 1 },
            { label: "6 months 5% OFF ₦14,250", value: 6 },
            { label: "1 year 10% OFF ₦27,000", value: 12 },
          ]}
          value={category}
          onValueChange={setCategory}
        />
        <View style={styles.feature}>
          <Text style={styles.featureTitle}>Features</Text>
          <ScrollView>
            {Features.map((item, index) => (
              <Text key={index} style={styles.featureText}>
                {item}
              </Text>
            ))}
          </ScrollView>
        </View>
        <PayWithPaystack
          amount={Number(amount)}
          expireDate={expireDate}
          label="Pay Now"
          disabled={!expireDate ? true : false}
          message={
            type === "subscribe"
              ? "Subscription Successful"
              : "Renew Subscription Successful"
          }
        />
      </View>
    </Modal>
  );
};

export default RenewLicense;
