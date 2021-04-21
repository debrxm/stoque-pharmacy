import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import {
  ActivityIndicator,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import AddProductInput from "../../components/AddProductInput/AddProductInput";
import AppButton from "../../components/AppButton/AppButton";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import Scanner from "../../components/Scanner/Scanner";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";
import { v4 as uuidv4 } from "uuid";

import { styles } from "./styles";
import { CreateProduct } from "../../firebase/firestore";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { Wait } from "../../utils/helper";

const AddProduct = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [scannerVisible, setScannerVisible] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [hasCategory, setHasCategory] = useState(false);
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [profit, setProfit] = useState("0");
  const [category, setCategory] = useState("uk");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [expireDate, setExpireDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleConfirmDate = (date) => {
    const timeString = new Date(date).toISOString().substring(0, 10);
    setExpireDate((new Date(date).getTime() / 1000).toFixed(0) * 1);
    setDate(timeString);
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const refactorCode = useCallback(() => {
    setErrorMessage("");
    const profi = (price - cost) * quantity;
    setProfit(profi);
  }, [price, cost, quantity]);

  useEffect(() => {
    refactorCode();
  }, [price, cost, quantity, refactorCode]);
  const onSuccessful = useCallback(() => {
    setSuccessful(true);
    Wait(6000).then(() => setSuccessful(false));
  }, []);
  const onCreateProduct = async (productData) => {
    const shopData = {
      shopId: user.shopId,
      shopName: user.shopName,
      phone: user.phone,
      whatsapp: user.whatsapp,
      shopAddress: user.shopAddress,
    };
    try {
      await CreateProduct(productData, shopData, user.id);
      onSuccessful();
      setBarcode("");
      setProductName("");
      setQuantity("");
      setCost("");
      setPrice("");
      setProfit("");
      setExpireDate("");
      setNotification("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  function regenerateId() {
    checkIfProductIdExist();
  }

  async function checkIfProductIdExist() {
    setLoading(true);
    const id = uuidv4()
      .split("-")
      .join("");
    if (
      productName.trim() === "" ||
      cost === "" ||
      price === "" ||
      quantity === "" ||
      notification === ""
    ) {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
      return;
    }
    if (quantity < notification) {
      setLoading(false);
      setErrorMessage(`Notification must be less than quantity!`);
      return;
    }
    const productRef = firestore
      .collection("products")
      .doc(user.id)
      .collection("products")
      .where("id", "==", `${id}`);
    const snapshot = await productRef.get();
    if (snapshot.docs.length > 0) {
      setErrorMessage(
        "Id already existed so we are trying agin with another id"
      );
      regenerateId();
      setLoading(false);
      return;
    }

    const productData = {
      id,
      category,
      barcode,
      product_name: productName,
      price,
      cost,
      quantity,
      sold: 0,
      profit: (price - cost) * quantity,
      notification,
      created_at: Date.now(),
      last_restock_date: Date.now(),
      last_restock_quantity: quantity,
      product_sold_since_last_restock: 0,
      archived: false,
      status: "In Stock",
      query: productName.toLowerCase(),
    };
    if (expireDate !== "") {
      productData["expireDate"] = expireDate;
    }
    // console.log(productData);
    onCreateProduct(productData);
  }
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 90 }}
            >
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>Add Product</Text>
      </View>
      <Scanner
        scannerVisible={scannerVisible}
        setScannerVisible={setScannerVisible}
        setBarcode={setBarcode}
      />
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
            onPress={() => setScannerVisible(true)}
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
            keyType="numeric"
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
          <CategoryContainer category={category} setCategory={setCategory} />
          <AddProductInput
            label="Notification"
            value={notification}
            onChangeText={(e) => {
              setErrorMessage("");
              setNotification(e * 1);
            }}
            maxLength={quantity && quantity}
            keyType="numeric"
            containerStyle={{ width: "35%" }}
          />
        </View>
        <View style={[styles.dateSelectorContainer]}>
          <Text style={styles.dateSelectorLabel}>Expiration date</Text>
          <AppButton
            onPress={toggleDatePicker}
            title={date || Date.now().toLocaleString()}
            customStyle={styles.dateSelector}
            textStyle={styles.dateSelectorText}
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => handleConfirmDate(date)}
          onCancel={toggleDatePicker}
          isDarkModeEnabled={false}
          pickerContainerStyleIOS={{ backgroundColor: cxlxrs.black }}
          minimumDate={new Date()}
        />
        {successful ? (
          <View style={styles.centerContainer}>
            <Text style={styles.successtext}>Product Added!</Text>
          </View>
        ) : null}
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
            <AppButton
              onPress={() => !loading && checkIfProductIdExist()}
              title="Add"
              customStyle={styles.addBtn}
              textStyle={styles.addBtnText}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default AddProduct;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "#fff",
    fontFamily: FontFamily.FiraMedium,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "#fff",
    fontFamily: FontFamily.FiraMedium,
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

function CategoryContainer({ category, setCategory }) {
  const user = useSelector(({ user }) => user.currentUser);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const categoryRef = firestore
      .collection("categories")
      .doc(user.id)
      .collection("categories");
    categoryRef.onSnapshot((snapShot) => {
      const categories = [];
      snapShot.forEach((item) => categories.push(item.data()));
      setCategories(categories);
    });
  };
  useEffect(() => {
    fetchCategories();
  }, [category]);
  return (
    <View style={[styles.selectContainer]}>
      <Text style={styles.label}>Category</Text>
      <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={categories}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <AntDesign
            name="caretdown"
            size={10}
            color="black"
            style={{ marginTop: 15, marginRight: 10 }}
          />
        )}
      />
    </View>
  );
}
