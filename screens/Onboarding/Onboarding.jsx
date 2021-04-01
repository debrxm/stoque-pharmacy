import React from "react";
import { Image, SafeAreaView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const prev1 = require("../../assets/images/onboarding-one.png");
const prev2 = require("../../assets/images/onboarding-two.png");

import { styles } from "./styles";
import AppButton from "../../components/AppButton/AppButton";
import Banner from "../../components/Banner/Banner";
import { cxlxrs } from "../../constants/Colors";

const Onboarding = () => {
  const navigation = useNavigation();

  const images = [prev2, prev1];

  return (
    <View style={styles.container}>
      <Banner
        data={[
          {
            title: "Title Slide1",
            source: prev1,
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 1,
          },
          {
            title: "Title slide 2",
            source: prev2,
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            id: 2,
          },
        ]}
      />
      <View style={styles.btns}>
        <AppButton
          onPress={() => navigation.navigate("Register")}
          title="REGISTER"
          customStyle={{
            ...styles.btn,
            backgroundColor: cxlxrs.white,
            elevation: 4,
          }}
          textStyle={{
            fontFamily: "FiraCode-Regular",
            textTransform: "capitalize",
            fontWeight: "400",
            color: cxlxrs.black,
          }}
        />
        <AppButton
          onPress={() => navigation.navigate("Login")}
          title="LOGIN"
          customStyle={styles.btn}
          textStyle={styles.btnText}
        />
      </View>
    </View>
  );
};

export default Onboarding;
