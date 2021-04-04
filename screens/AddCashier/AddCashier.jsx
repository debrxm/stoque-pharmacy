import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AddProductInput from "../../components/AddProductInput/AddProductInput";
import AppButton from "../../components/AppButton/AppButton";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import { cxlxrs } from "../../constants/Colors";
import { v4 as uuidv4 } from "uuid";

import { styles } from "./styles";
import { CreateEmployee } from "../../firebase/firestore";
import { useSelector } from "react-redux";
import { GenerateRandomNDigits } from "../../utils/helper";

const AddCashier = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [passcode, setPasscode] = useState(GenerateRandomNDigits(5));
  const [cashierName, setCashierName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    onReloadPasscode();
  }, []);
  const onReloadPasscode = async (e) => {
    setPasscode(GenerateRandomNDigits(5));
  };
  const onCreateCashier = async (cashierData) => {
    try {
      await CreateEmployee(cashierData, user.id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  function regenerateId() {
    checkIfCashierIdExist();
  }

  async function checkIfCashierIdExist() {
    setLoading(true);
    const id = uuidv4();
    if (cashierName.trim() === "") {
      setLoading(false);
      setErrorMessage(`All fields are required!`);
      return;
    }
    const cashierRef = firestore
      .collection("employees")
      .doc(user.id)
      .collection("cashiers")
      .where("id", "==", `${id}`);
    const snapshot = await cashierRef.get();
    if (snapshot.docs.length > 0) {
      setErrorMessage(
        "Id already existed so we are trying again with another id"
      );
      regenerateId();
      setLoading(false);
      return;
    }

    const cashierData = {
      id,
      name: cashierName,
      phone,
      address,
      created_at: Date.now(),
    };
    // console.log(cashierData);s
    onCreateCashier(cashierData);
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
        <Text style={styles.routeTitle}>Add Cashier</Text>
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
        <AddProductInput
          label="Cashier Name"
          value={cashierName}
          onChangeText={(e) => {
            setErrorMessage("");
            setCashierName(e);
          }}
          autoCapitalize="words"
        />
        <View style={{ height: 20 }}></View>
        <AddProductInput
          label="Address"
          value={address}
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
        <View style={[styles.flexGrouping, { marginBottom: 30 }]}>
          <View style={{ width: "79%" }}>
            <Text style={styles.dateSelectorLabel}>Passcode</Text>
            <AppButton
              title={passcode}
              customStyle={{
                ...styles.passcodeView,
                width: "100%",
              }}
              textStyle={styles.passcodeViewText}
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
          <AppButton
            onPress={() => !loading && checkIfCashierIdExist()}
            title="Add"
            customStyle={styles.addBtn}
            textStyle={styles.addBtnText}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default AddCashier;
