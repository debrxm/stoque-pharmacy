import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import { cxlxrs } from "../../constants/Colors";
import { createShopAdminProfile } from "../../firebase/auth";
import { auth } from "../../firebase/config";
import { validateUser } from "../../utils/validations";

import { styles } from "./styles";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [toggleShowConfirmPassword, setToggleShowConfirmPassword] = useState(
    false
  );
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [""]);

  const handleRegisterUser = async () => {
    if (fullname.trim() === "" || email.trim() === "" || phone.trim() === "") {
      setErrorMessage("All fields are required");
      return;
    }
    if (confirmPasscode !== passcode) {
      setErrorMessage("Passcode doesn't match");
      return;
    }
    const result = validateUser({
      phone,
      email,
    });
    if (result.errors.length) {
      setErrorMessage(result.errors.toString().replace(/\,/gi, " "));
      return;
    }
    setLoading(true);
    createUser();
  };
  const createUser = async () => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        passcode
      );
      await createShopAdminProfile(user, {
        fullname,
        phone,
      });
      setLoading(false);
    } catch (error) {
      error.code === "auth/email-already-in-use"
        ? setErrorMessage(
            "The email address is already in use by another account"
          )
        : error.code === "auth/weak-password"
        ? setErrorMessage("Password should be at least 6 characters")
        : setErrorMessage("Internal server error");
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/auth-bg.png")}
      style={styles.bgStyle}
    >
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headText}>Create Account</Text>
          <Text style={styles.headSubText}>
            This will only take few seconds
          </Text>
        </View>
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
        <View style={styles.inputGroup}>
          <FontAwesome
            name="user-o"
            style={styles.inputGroupIcon}
            size={20}
            color="#97989A"
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Full name"
            placeholderTextColor="#97989A"
            autoCapitalize="words"
            onChangeText={(e) => {
              setErrorMessage("");
              setFullname(e);
            }}
            value={fullname}
          />
        </View>
        <View style={styles.inputGroup}>
          <FontAwesome
            name="envelope-o"
            style={styles.inputGroupIcon}
            size={19}
            color="#97989A"
          />

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="#97989A"
            autoCapitalize="none"
            onChangeText={(e) => {
              setErrorMessage("");
              setEmail(e);
            }}
            value={email}
          />
        </View>
        <View style={styles.inputGroup}>
          <Feather
            name="phone"
            style={styles.inputGroupIcon}
            size={20}
            color="#97989A"
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            keyboardType="phone-pad"
            placeholder="Phone"
            placeholderTextColor="#97989A"
            autoCapitalize="none"
            onChangeText={(e) => {
              setErrorMessage("");
              setPhone(e);
            }}
            value={phone}
          />
        </View>
        <View style={styles.inputGroup}>
          <AntDesign
            name="lock"
            style={styles.inputGroupIcon}
            size={20}
            color="#97989A"
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            keyboardType="default"
            secureTextEntry={!toggleShowPassword ? true : false}
            placeholder="Passcode"
            placeholderTextColor="#97989A"
            autoCapitalize="none"
            onChangeText={(e) => {
              setErrorMessage("");
              setPasscode(e);
            }}
            value={passcode}
          />
          <TouchableWithoutFeedback
            onPress={() => setToggleShowPassword(!toggleShowPassword)}
          >
            <Feather
              name={toggleShowPassword ? "eye-off" : "eye"}
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputGroup}>
          <AntDesign
            name="lock"
            style={styles.inputGroupIcon}
            size={20}
            color="#97989A"
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            keyboardType="default"
            secureTextEntry={!toggleShowConfirmPassword ? true : false}
            placeholder="Confirm passcode"
            placeholderTextColor="#97989A"
            autoCapitalize="none"
            onChangeText={(e) => {
              setErrorMessage("");
              setConfirmPasscode(e);
            }}
            value={confirmPasscode}
          />
          <TouchableWithoutFeedback
            onPress={() =>
              setToggleShowConfirmPassword(!toggleShowConfirmPassword)
            }
          >
            <Feather
              name={toggleShowConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.btns}>
          <AppButton
            onPress={handleRegisterUser}
            title="Create Account"
            customStyle={styles.btn}
            loading={loading}
            textStyle={{
              fontFamily: "FiraCode-Regular",
              textTransform: "capitalize",
              fontWeight: "400",
              marginTop: -3,
            }}
          />
        </View>
        <View style={{ position: "absolute", bottom: 20, width: "100%" }}>
          <Text style={{ textAlign: "center", color: cxlxrs.black }}>
            Already have an account?{" "}
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={{ color: cxlxrs.textColor }}>Login</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Register;
