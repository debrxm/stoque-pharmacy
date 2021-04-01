import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
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
import { auth } from "../../firebase/config";
import { validateLoginUser } from "../../utils/validations";

import { styles } from "./styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const handleSubmit = async () => {
    if (email.trim() === "" || passcode.trim() === "") {
      setErrorMessage("All fields are required");
      return;
    }
    const result = validateLoginUser({ password: passcode, email });
    if (result.errors.length) {
      setErrorMessage(result.errors.toString().replace(/\,/gi, " "));
      setLoading(false);
      return;
    }
    setLoading(true);
    onLogUserIn();
  };
  const onLogUserIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, passcode);
      // setEmail("");
      // setPasscode("");
      setLoading(false);
    } catch (error) {
      error.code === "auth/wrong-password"
        ? setErrorMessage(
            "The password is invalid or the user does not have a password."
          )
        : error.code === "auth/user-not-found"
        ? setErrorMessage(
            "There is no user record corresponding to this identifier."
          )
        : setErrorMessage("Shit just got real");
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
          <Text style={styles.headText}>Welcome Back</Text>
          <Text style={styles.headSubText}>Login to access your account</Text>
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
            name="envelope-o"
            style={styles.inputGroupIcon}
            size={19}
            color="#97989A"
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            keyboardType="email-address"
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
        <View style={{ marginVertical: 15 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Reset");
            }}
          >
            <Text style={{ textAlign: "center", color: cxlxrs.textColor }}>
              Forgot password?
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.btns}>
          <AppButton
            onPress={handleSubmit}
            title="Login"
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
      </View>
      <View style={{ position: "absolute", bottom: 20, width: "100%" }}>
        <Text style={{ textAlign: "center", color: cxlxrs.black }}>
          Dont't have an account?{" "}
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={{ color: cxlxrs.textColor }}>Register</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Login;
