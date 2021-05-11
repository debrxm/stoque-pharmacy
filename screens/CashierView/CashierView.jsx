import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
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
import { v4 as uuidv4 } from "uuid";

import { styles } from "./styles";
import {
  UpdateCashierProfile,
  OnArchiveCashier,
  OnDeleteCashier,
} from "../../firebase/auth";
import { useSelector } from "react-redux";
import { GenerateRandomNDigits } from "../../utils/helper";
import { firestore } from "../../firebase/config";
import HelperDialog from "../../components/HelperDialog/HelperDialog";
import ReAuth from "../../components/ReAuth/ReAuth";
import CustomSelect from "../../components/CustomSelect/CustomSelect";

const AddCashier = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params.data;
  const [passcode, setPasscode] = useState(data.passcode);
  const [writeAccess, setWriteAccess] = useState({
    label: "True",
    value: true,
  });
  const [cashierName, setCashierName] = useState(data.name);
  const [address, setAddress] = useState(data.address);
  const [phone, setPhone] = useState(data.phone);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isAuthentic, setIsAuthentic] = useState(false);
  const [actionType, setActionType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {}, [editing, actionType, isAuthentic, dialogVisible]);
  const onReloadPasscode = async (e) => {
    setPasscode(GenerateRandomNDigits(5));
  };
  const onEditting = async (cashierData) => {
    try {
      UpdateCashierProfile(cashierData, user.shopId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(`An error occured while creating cashier`);
      setLoading(false);
    }
  };
  const Next = () => {
    setIsAuthentic(true);
    if (actionType === "edit") {
      setEditing(true);
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
      ? OnArchiveCashier(data, user.shopId, navigation)
      : setDialogVisible(true);
  };
  const onDelete = () => {
    setActionType("delete");
    isAuthentic
      ? OnDeleteCashier(data.id, user.shopId, navigation)
      : setDialogVisible(true);
  };
  async function checkIfCashierNumberMatch() {
    setErrorMessage("");
    if (editing && !loading && isAuthentic) {
      if (!user.isProfileSetupCompleted) {
        setErrorMessage(`You haven't set up your shop `);
        return;
      }

      setLoading(true);
      const id = uuidv4()
        .split("-")
        .join("");
      if (cashierName.trim() === "") {
        setLoading(false);
        setErrorMessage(`All fields are required!`);
        return;
      }
      const cashierRef = firestore
        .collection("cashiers")
        .doc(`${user.shopId}`)
        .collection("cashiers")
        .where("phone", "==", phone);
      const snapshot = await cashierRef.get();
      if (
        snapshot.docs.length > 0 &&
        snapshot.docs[0].data().passcode !== data.passcode
      ) {
        setErrorMessage("This phone number belongs to a different user");
        setLoading(false);
        return;
      }

      const cashierData = {
        id,
        name: cashierName,
        phone,
        address,
        passcode,
      };
      onEditting(cashierData);
    } else {
      if (isAuthentic) {
        setEditing(true);
      } else {
        setActionType("edit");
        setDialogVisible(true);
      }
    }
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
          editable={editing}
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
        {/* <CustomSelect
          label="Write Permission"
          labelStyle={{
            textAlign: "left",
            margin: 0,
            marginBottom: 10,
            fontSize: 12,
            color: cxlxrs.textColor,
          }}
          disabled={editing}
          options={[
            { label: "True", value: true },
            { label: "False", value: false },
          ]}
          containerStyle={{ width: "100%" }}
          value={writeAccess}
          onValueChange={setWriteAccess}
        />
        <View style={{ height: 20 }}></View> */}
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
            onPress={() => editing && onReloadPasscode()}
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
              onPress={checkIfCashierNumberMatch}
              title={editing ? "Confirm" : "Edit"}
              customStyle={{
                ...styles.addBtn,
                width: editing ? "45%" : "70%",
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
                  width: editing ? "45%" : "70%",
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

export default AddCashier;
