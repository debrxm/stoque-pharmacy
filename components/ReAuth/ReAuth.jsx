import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, TextInput, TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";
import { cxlxrs } from "../../constants/Colors";
import firebase, { auth } from "../../firebase/config";
import AppButton from "../AppButton/AppButton";
import CustomPopUp from "../CustomPopUp/CustomPopUp";
import { styles } from "./styles";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ReAuth = ({ onAuthentic }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [currentPassword, setCurrentPassword] = useState("");
  const [toggleShowCurrentPassword, setToggleShowCurrentPassword] = useState(
    false
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onReAuth = async () => {
    if (currentPassword.trim() === "") {
      setErrorMessage("Please enter your password");
      return;
    }
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    const currentUserAuth = auth.currentUser;
    try {
      const reAuth = await currentUserAuth.reauthenticateWithCredential(
        credential
      );
      if (reAuth.user) {
        onAuthentic();
      }
    } catch (err) {
      setErrorMessage("Current password is incorrect");
      setErrorMessage("Password is incorrect");
      setLoading(false);
      return;
    }
  };
  return (
    <>
      {successMessage !== "" ? (
        <CustomPopUp
          message={`${successMessage}`}
          type={"success"}
          customStyles={{
            ...styles.customErrorStyle,
            backgroundColor: cxlxrs.success,
          }}
          customTextStyles={styles.customErrorTextStyles}
        />
      ) : null}
      <View style={styles.deleteContainer}>
        <View style={[styles.box, styles.theCompany]}>
          <View style={styles.deleteContainerContent}>
            {errorMessage !== "" ? (
              <CustomPopUp
                message={`${errorMessage}`}
                type={"error"}
                customStyles={styles.customErrorStyle}
                customTextStyles={styles.customErrorTextStyles}
              />
            ) : null}

            <View style={styles.inputGroup}>
              <AntDesign
                style={styles.inputGroupIcon}
                name="lock"
                size={22}
                color="black"
              />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                secureTextEntry={!toggleShowCurrentPassword ? true : false}
                placeholder="Enter password"
                placeholderTextColor={cxlxrs.black}
                autoCapitalize="none"
                onChangeText={(e) => {
                  setErrorMessage("");
                  setCurrentPassword(e);
                }}
                value={currentPassword}
              />
              <TouchableWithoutFeedback
                onPress={() =>
                  setToggleShowCurrentPassword(!toggleShowCurrentPassword)
                }
              >
                <Feather
                  name={toggleShowCurrentPassword ? "eye-off" : "eye"}
                  size={20}
                  color="black"
                  style={{ marginRight: 10 }}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <AppButton
                onPress={onReAuth}
                title={"Confirm"}
                customStyle={{
                  width: "50%",
                }}
                textStyle={{
                  fontSize: 12,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ReAuth;
