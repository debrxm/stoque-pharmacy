import React, { useEffect, useState } from "react";
import { Dimensions, Modal, Text, View } from "react-native";
import { useSelector } from "react-redux";
// import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
// import Constants from "expo-constants";
import { throttle } from "lodash";
// import CustomPopUp from "../CustomPopUp/CustomPopUp";
// import { styles } from "./styles";
import BarCodeScreen from "../CodeScanner/CodeScanner";
import requestCameraPermissionsAsync from "../../utils/requestCameraPermissionsAsync";
import { TransferBarcode } from "../../utils/helper";

const Scanner = ({
  setBarcode,
  scannerVisible,
  setScannerVisible,
  quickScan,
}) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    setHasPermission(await requestCameraPermissionsAsync());
  };
  const _handleBarCodeScanned = throttle((info) => {
    setScanned(true);
    if (quickScan) {
      console.log(info.data);
      TransferBarcode(info.data, currentUser.id);
      return;
    }
    setBarcode(info.data);
    setScannerVisible(false);
  }, 1000);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Modal
      animationType="fade"
      transparent={false}
      statusBarTranslucent={true}
      visible={scannerVisible}
      onRequestClose={() => {}}
      style={{
        width: "100%",
        height: Dimensions.get("screen").height,
      }}
    >
      <BarCodeScreen
        scanned={scanned}
        setScanned={setScanned}
        handleBarCodeScanned={_handleBarCodeScanned}
        setScannerVisible={setScannerVisible}
      />
    </Modal>
  );
};

export default Scanner;
