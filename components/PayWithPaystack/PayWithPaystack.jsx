import React, { useState, useRef } from "react";
import PaystackWebView from "react-native-paystack-webview";
import { Modal } from "react-native";
import { paystackKeys } from "../../configs/apiKeys";
import { FUND_WALLET, GET_WALLET } from "../../redux/investment/actionCreator";
import { useDispatch, connect, useSelector } from "react-redux";
import AppButton from "../AppButton/AppButton";
const uuid = require("react-native-uuid");

import { styles } from "./styles";

const PayWithPaystack = ({
  topUp,
  amount,
  handleCreateInvoice,
  wallet,
  FUND_WALLET,
}) => {
  const childRef = useRef();
  const [visible, setVisible] = useState(false);
  const { user, client } = useSelector(({ Auth }) => Auth);
  const [cancel, setCancel] = useState("");
  const dispatch = useDispatch();
  const handleWebViewMessage = (e) => {
    console.log("WALLET VALUES ===:", e);
    if (wallet && !cancel) {
      return fundWallet();
    }
    if (topUp) {
      return fundWallet();
    }
    handleCreateInvoice();
  };

  const fundWallet = async () => {
    setVisible(true);
    try {
      await FUND_WALLET(user.id, { amount: amount });
      await GET_WALLET(user.id);
      setVisible(false);
      // `Transaction completed, wallet has been credited with ${amount}`
    } catch (err) {
      setVisible(false);
      // "Ooops an error occured wallet no funded" + " " + err,
    }
  };

  return (
    <>
      <PaystackWebView
        showPayButton={false}
        paystackKey={paystackKeys.public}
        amount={amount || 500000}
        billingEmail="payment@boundlessservicesng.com"
        billingMobile="09787377462"
        billingName="Boundless Investment"
        ActivityIndicatorColor="green"
        SafeAreaViewContainer={{ marginTop: 5 }}
        SafeAreaViewContainerModal={{ marginTop: 5 }}
        ref={childRef}
        onCancel={(e) => {
          setCancel("oooops transaction cancelled!");
        }}
        onSuccess={handleWebViewMessage}
        autoStart={false}
        refNumber={uuid.v1()} // this is only for cases where you have a reference number generated
      />

      <AppButton
        onPress={() => {
          // if (!amount) return;
          childRef.current.StartTransaction();
        }}
        title={topUp ? "Top Up" : "Pay With Paystack"}
        customStyle={styles.payMethodBtn}
        textStyle={{
          fontFamily: "FiraCode-SemiBold",
          textTransform: "capitalize",
          fontWeight: "400",
          fontSize: 12,
        }}
      />
    </>
  );
};

export default connect(null, { FUND_WALLET })(PayWithPaystack);
