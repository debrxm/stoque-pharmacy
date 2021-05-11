import React, { useState, useRef } from "react";
import PaystackWebView from "react-native-paystack-webview";
import { paystackLiveKeys } from "../../configs/apiKeys";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../AppButton/AppButton";
const uuid = require("react-native-uuid");

import { styles } from "./styles";
import { FontFamily } from "../../constants/Fonts";
import { onAddSubscription } from "../../firebase/firestore";
import { cxlxrs } from "../../constants/Colors";

const PayWithPaystack = ({ amount, expireDate, label, disabled, message }) => {
  const user = useSelector(({ user }) => user.currentUser);
  const childRef = useRef();
  const [cancel, setCancel] = useState("");
  const dispatch = useDispatch();

  const updateSubscription = async () => {
    try {
      onAddSubscription({
        userId: user.id,
        ...expireDate,
        message,
        token: user.notificationToken,
      });
    } catch (err) {
      // "Ooops an error occured wallet no funded" + " " + err,
    }
  };

  return (
    <>
      <PaystackWebView
        showPayButton={false}
        paystackKey={paystackLiveKeys.public}
        amount={amount || 500000}
        billingEmail="payment@stoque.com"
        billingMobile="09787377462"
        billingName="Boundless Investment"
        ActivityIndicatorColor="green"
        SafeAreaViewContainer={{ marginTop: 5 }}
        SafeAreaViewContainerModal={{ marginTop: 5 }}
        ref={childRef}
        onCancel={(e) => {
          setCancel("oooops transaction cancelled!");
        }}
        onSuccess={updateSubscription}
        autoStart={false}
        refNumber={uuid.v1()} // this is only for cases where you have a reference number generated
      />

      <AppButton
        onPress={() => {
          if (!amount || disabled) return;
          childRef.current.StartTransaction();
        }}
        title={label}
        customStyle={styles.payMethodBtn}
        textStyle={{
          fontFamily: FontFamily.FiraSemiBold,
          textTransform: "capitalize",
          fontWeight: "400",
          fontSize: 12,
          color: cxlxrs.black,
        }}
      />
    </>
  );
};

export default PayWithPaystack;
