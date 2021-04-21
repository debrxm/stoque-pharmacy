import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AddProductInput from "../../components/AddProductInput/AddProductInput";
import AppButton from "../../components/AppButton/AppButton";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import { cxlxrs } from "../../constants/Colors";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import HelperDialog from "../../components/HelperDialog/HelperDialog";
import ReAuth from "../../components/ReAuth/ReAuth";

import { styles } from "./styles";
import { OnArchiveProduct, OnDeleteProduct } from "../../firebase/firestore";
const ProductView = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const route = useRoute();
  const data = route.params.data;
  const navigation = useNavigation();
  const [actionType, setActionType] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [barcode, setBarcode] = useState(data.barcode);
  const [productName, setProductName] = useState(data.product_name);
  const [quantity, setQuantity] = useState(`${data.quantity}`);
  const [cost, setCost] = useState(`${data.cost}`);
  const [price, setPrice] = useState(`${data.price}`);
  const [profit, setProfit] = useState(data.profit);
  const [category, setCategory] = useState(data.category);
  const [expireDate, setExpireDate] = useState(
    new Date(data.expireDate ? data.expireDate : Date.now())
      .toISOString()
      .substring(0, 10)
  );
  const [restocking, setRestocking] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [notification, setNotification] = useState(`${data.notification}`);
  const [loading, setLoading] = useState(false);
  const [isAuthentic, setIsAuthentic] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const refactorCode = useCallback(() => {
    setErrorMessage("");
    const profi = (price - cost) * quantity;
    setProfit(profi);
  }, [price, cost, quantity]);

  useEffect(() => {
    refactorCode();
  }, [price, cost, quantity, restocking, actionType, refactorCode]);
  const onSuccessful = useCallback(() => {
    setSuccessful(true);
    Wait(6000).then(() => setSuccessful(false));
  }, []);
  const productsRef = firestore
    .collection("products")
    .doc(user.id)
    .collection("products")
    .doc(data.id);
  const restockProduct = async () => {
    if (cost === "" || price === "" || quantity === "" || notification === "") {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
      return;
    }
    if (quantity * 1 < notification * 1) {
      setLoading(false);
      setErrorMessage(`Notification must be less than quantity!`);
      return;
    }
    try {
      await productsRef.update({ price, cost, notification, quantity });
      setRestocking(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const onRestocking = () => {
    if (restocking && !loading && isAuthentic) {
      restockProduct();
    } else {
      if (isAuthentic) {
        setRestocking(true);
      } else {
        setActionType("restock");
        setDialogVisible(true);
      }
    }
  };
  const Next = () => {
    setIsAuthentic(true);
    if (actionType === "restock") {
      setRestocking(true);
    }
    if (actionType === "archive") {
      onArchive();
    }
    if (actionType === "delete") {
      onDelete();
    }
    setDialogVisible(false);
  };
  const onArchive = () => {
    setActionType("archive");
    isAuthentic
      ? OnArchiveProduct(data, user.shopId, navigation)
      : setDialogVisible(true);
  };
  const onDelete = () => {
    setActionType("delete");
    isAuthentic
      ? OnDeleteProduct(data.id, user.shopId)
      : setDialogVisible(true);
  };
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 60 }}
            >
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={cxlxrs.black}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>{data.product_name}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          {errorMessage !== "" ? (
            <CustomPopUp
              message={`${errorMessage}`}
              type={"error"}
              customStyles={{
                backgroundColor: "red",
                borderRadius: 30,
                justifyContent: "center",
              }}
              customTextStyles={{ color: "#ffffff", textAlign: "center" }}
            />
          ) : null}
        </View>

        <View style={[styles.flexGrouping, { marginBottom: 30 }]}>
          <AddProductInput
            label="Barcode"
            value={barcode}
            onChangeText={(e) => {
              setErrorMessage("");
              setBarcode(e);
            }}
            containerStyle={{ width: "79%" }}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "20%",
              height: 50,
            }}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={30}
              color={cxlxrs.textColor}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.flexGrouping, { marginBottom: 30 }]}>
          <AddProductInput
            label="Product Name"
            value={productName}
            onChangeText={(e) => {
              setErrorMessage("");
              setProductName(e);
            }}
            autoCapitalize="words"
            editable={false}
            containerStyle={{ width: "59%" }}
          />

          <AddProductInput
            label="Cost"
            value={cost}
            onChangeText={(e) => {
              setErrorMessage("");
              refactorCode();
              setCost(e * 1);
            }}
            defaultValue={data.cost}
            keyType="numeric"
            editable={restocking}
            containerStyle={{ width: "39%" }}
          />
        </View>
        <View style={[styles.flexGrouping, { marginBottom: 30 }]}>
          <AddProductInput
            label="Price"
            value={price}
            onChangeText={(e) => {
              setErrorMessage("");
              refactorCode();
              setPrice(e * 1);
            }}
            keyType="numeric"
            editable={restocking}
            containerStyle={{ width: Dimensions.get("screen").width / 3 - 11 }}
          />
          <AddProductInput
            label="Quantity"
            value={quantity}
            onChangeText={(e) => {
              setErrorMessage("");
              refactorCode();
              setQuantity(e * 1);
            }}
            keyType="numeric"
            editable={restocking}
            containerStyle={{ width: Dimensions.get("screen").width / 3 - 11 }}
          />
          <View>
            <Text style={styles.dateSelectorLabel}>Profit</Text>
            <AppButton
              title={`₦${profit}`}
              customStyle={{
                ...styles.dateSelector,
                width: Dimensions.get("screen").width / 3 - 11,
              }}
              textStyle={styles.dateSelectorText}
            />
          </View>
        </View>
        <View style={[styles.flexGrouping, { marginBottom: 30 }]}>
          <AddProductInput
            label="Category"
            value={category}
            onChangeText={(e) => {
              setErrorMessage("");
            }}
            editable={false}
            containerStyle={{ width: "63 %" }}
          />
          <AddProductInput
            label="Notification"
            value={notification}
            onChangeText={(e) => {
              setErrorMessage("");
              setNotification(e * 1);
            }}
            maxLength={quantity && quantity}
            keyType="numeric"
            editable={restocking}
            containerStyle={{ width: "35%" }}
          />
        </View>
        {data.expireDate ? (
          <View style={[styles.dateSelectorContainer]}>
            <Text style={styles.dateSelectorLabel}>Expiration date</Text>
            <AppButton
              title={expireDate || Date.now().toLocaleString()}
              customStyle={styles.dateSelector}
              textStyle={styles.dateSelectorText}
            />
          </View>
        ) : null}
        {successful ? (
          <View style={styles.centerContainer}>
            <Text style={styles.successtext}>Product Added!</Text>
          </View>
        ) : null}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "absolute",
          bottom: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={cxlxrs.black}
            style={{ marginBottom: 10 }}
          />
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AppButton
              onPress={onRestocking}
              title={restocking ? "Confirm" : "Restock"}
              customStyle={{
                ...styles.addBtn,
                width: restocking ? "45%" : "70%",
              }}
              textStyle={styles.addBtnText}
            />
            {restocking ? (
              <AppButton
                onPress={() => setRestocking(false)}
                title={"Cancel"}
                customStyle={{
                  ...styles.addBtn,
                  backgroundColor: cxlxrs.danger,
                  width: restocking ? "45%" : "70%",
                }}
                textStyle={styles.addBtnText}
              />
            ) : (
              <>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onArchive}
                >
                  <MaterialIcons name="archive" size={28} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onDelete}
                >
                  <Ionicons
                    name="trash-bin-outline"
                    size={24}
                    color={cxlxrs.danger}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>

      <HelperDialog
        visible={dialogVisible}
        setDialogVisible={setDialogVisible}
        title={"Give Permission"}
        noTitle
      >
        <ReAuth onAuthentic={Next} />
      </HelperDialog>
    </>
  );
};

export default ProductView;
