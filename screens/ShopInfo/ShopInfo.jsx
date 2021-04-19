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
import { UpdateShopInfo } from "../../firebase/auth";
import { useSelector } from "react-redux";

const ShopInfo = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [shopId] = useState(user.shopId);
  const [shopName, setShopName] = useState(user.shopName);
  const [shopAddress, setShopAddress] = useState(user.shopAddress);
  const [phone, setPhone] = useState(user.phone);
  const [whatsapp, setWhatsapp] = useState(user.whatsapp);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {}, [""]);

  const onCompleteSetup = async (shopData) => {
    try {
      await UpdateShopInfo(shopData, user.id);
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
    const shopData = {
      shopName,
      phone,
      whatsapp,
      shopAddress,
    };
    onCompleteSetup(shopData);
  }
  const onEditting = () => {
    if (editing && !loading) {
      checkIfShopIdExist();
    } else {
      setEditing(true);
    }
  };
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => (editing ? setEditing(false) : navigation.goBack())}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 90 }}
            >
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>
          {editing ? "Editing Shop Info" : "Shop Info"}
        </Text>
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
            onPress={() => {}}
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
          editable={editing}
          autoCapitalize="words"
        />
        <View style={{ height: 20 }}></View>
        <AddProductInput
          label="Address"
          value={shopAddress}
          onChangeText={(e) => {
            setErrorMessage("");
            setShopAddress(e);
          }}
          editable={editing}
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
          editable={editing}
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
          editable={editing}
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AppButton
                onPress={onEditting}
                title={editing ? "Confirm" : "Edit"}
                customStyle={{
                  ...styles.addBtn,
                  width: editing ? "45%" : "100%",
                }}
                textStyle={styles.addBtnText}
              />
              {editing ? (
                <AppButton
                  onPress={() => setEditing(false)}
                  title={"Cancel"}
                  customStyle={{
                    ...styles.addBtn,
                    backgroundColor: cxlxrs.danger,
                    width: editing ? "45%" : "100%",
                  }}
                  textStyle={styles.addBtnText}
                />
              ) : null}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default ShopInfo;
