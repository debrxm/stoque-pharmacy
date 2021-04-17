import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AddProductInput from "../../components/AddProductInput/AddProductInput";
import AppButton from "../../components/AppButton/AppButton";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import { cxlxrs } from "../../constants/Colors";

import { styles } from "./styles";
import { CompleteStoreSetup } from "../../firebase/auth";
import { useSelector } from "react-redux";
import { GenerateRandomNDigits } from "../../utils/helper";
import { firestore } from "../../firebase/config";

const CompleteSetup = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [shopId, setShopId] = useState(GenerateRandomNDigits(3));
  const [shopName, setShopName] = useState("");
  const [shopAddress, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("+234");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onReloadPasscode();
  }, [""]);
  const onReloadPasscode = async (e) => {
    setShopId(GenerateRandomNDigits(3));
  };
  const onCompleteSetup = async (shopData) => {
    try {
      await CompleteStoreSetup(shopData, user.id);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
    }
  };

  async function checkIfShopIdExist() {
    setLoading(true);
    if (shopName.trim() === "" || shopAddress.trim() === "") {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
      return;
    }
    const shopRef = firestore
      .collection("users")
      .where("shopId", "==", `${shopId}`);
    const snapshot = await shopRef.get();
    if (snapshot.docs.length > 0) {
      setErrorMessage("Id already exist, tap the icon to generate another one");
      setLoading(false);
      return;
    }

    const shopData = {
      shopId,
      shopName,
      phone,
      whatsapp,
      shopAddress,
      isProfileSetupCompleted: true,
    };
    onCompleteSetup(shopData);
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
        <Text style={styles.routeTitle}>Complete Shop Setup</Text>
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
              customTextStyles={{ color: "#ffffff" }}
            />
          ) : null}
        </View>
        <View style={[styles.flexGrouping, { marginBottom: 0 }]}>
          <View style={{ width: "79%" }}>
            <Text style={styles.dateSelectorLabel}>Shop ID</Text>
            <AppButton
              title={shopId}
              customStyle={{
                ...styles.shopIdView,
                width: "100%",
              }}
              textStyle={styles.shopIdViewText}
            />
          </View>
          <TouchableOpacity
            onPress={() => onReloadPasscode()}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "20%",
              height: 50,
            }}
          >
            <AntDesign name="reload1" size={30} color={cxlxrs.textColor} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }}></View>
        <AddProductInput
          label="Shop Name"
          value={shopName}
          onChangeText={(e) => {
            setErrorMessage("");
            setShopName(e);
          }}
          autoCapitalize="words"
        />
        <View style={{ height: 20 }}></View>
        <AddProductInput
          label="Address"
          value={shopAddress}
          onChangeText={(e) => {
            setErrorMessage("");
            setAddress(e);
          }}
          autoCapitalize="words"
        />
        <View style={{ height: 20 }}></View>
        <AddProductInput
          label="Phone"
          value={phone}
          onChangeText={(e) => {
            setErrorMessage("");
            setPhone(e);
          }}
          keyType="numeric"
        />
        <View style={{ height: 20 }}></View>
        <AddProductInput
          label="Whatsapp"
          value={whatsapp}
          onChangeText={(e) => {
            setErrorMessage("");
            setWhatsapp(e);
          }}
          keyType="numeric"
        />

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
              onPress={() => !loading && checkIfShopIdExist()}
              title="Complete"
              customStyle={styles.addBtn}
              textStyle={styles.addBtnText}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default CompleteSetup;
