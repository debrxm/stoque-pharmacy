import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Modal, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { throttle } from "lodash";
import BarCodeScreen from "../CodeScanner/CodeScanner";
import requestCameraPermissionsAsync from "../../utils/requestCameraPermissionsAsync";
import { firestore } from "../../firebase/config";
import HelperDialog from "../HelperDialog/HelperDialog";
import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";
import AppButton from "../AppButton/AppButton";
const Scanner = ({
  setBarcode,
  scannerVisible,
  setScannerVisible,
  quickScan,
}) => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    requestPermission();
  }, [""]);
  const getProductData = async (barcode) => {
    setIsLoading(true);
    const productsRef = firestore
      .collection("products")
      .doc(user.id)
      .collection("products")
      .where("barcode", "==", barcode);
    const snapshot = await productsRef.get();
    if (snapshot.docs.length === 1) {
      snapshot.docs.forEach((item) => {
        setProductData(item.data());
      });
      setScanned(false);
      setIsLoading(false);
    }
  };
  const requestPermission = async () => {
    setHasPermission(await requestCameraPermissionsAsync());
  };
  const _handleBarCodeScanned = throttle((info) => {
    setScanned(true);
    if (quickScan) {
      setDialogVisible(true);
      setScannerVisible(false);
      getProductData(info.data);
      return;
    }
    setBarcode(info.data);
    setScannerVisible(false);
    setScanned(false);
  }, 1000);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
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
      <HelperDialog
        visible={dialogVisible}
        setDialogVisible={setDialogVisible}
        title={"Product Preview"}
      >
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={cxlxrs.black}
            style={{ marginBottom: 10 }}
          />
        ) : (
          <>
            {/* <View
              style={[
                styles.productIconContainer,
                {
                  borderColor:
                    productData.status === "In Stock"
                      ? cxlxrs.success
                      : cxlxrs.textColor,
                  // backgroundColor:
                  //   productData.status === "In Stock" ? cxlxrs.success : cxlxrs.textColor,
                },
              ]}
            >
              <MaterialIcons name="inventory" size={23} color={cxlxrs.white} />
            </View> */}
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoName}>
                {productData.product_name}
              </Text>
              <Text style={styles.cardInfoPrice}>₦{productData.price}</Text>
              <View style={styles.cardInfoSub}>
                <Text style={styles.cardInfoSubText}>
                  Sold: {productData.product_sold_since_last_restock}
                </Text>
                <Text style={styles.cardInfoSubText}>
                  {productData.status === "In Stock"
                    ? `In Stock: ${productData.quantity}`
                    : `Sold Out`}
                </Text>
              </View>
            </View>
            <AppButton
              onPress={() => {
                navigation.navigate("ProductView", { data: productData });
                setDialogVisible(false);
              }}
              title="View Product"
              customStyle={styles.addBtn}
              textStyle={styles.addBtnText}
            />
          </>
        )}
      </HelperDialog>
    </>
  );
};

export default Scanner;
