import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useLinking } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, cxlxrs } from "../../constants/Colors";
import logo from "../../assets/images/logo.png";
import { styles } from "./styles";

const About = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {}, [""]);
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 60 }}
            >
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>Abouts</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.orgName}>Stoque</Text>
        <Text style={styles.orgName}>solutions Nigeria ltd</Text>
        <Text style={styles.descriptionText}>
          is a store/stock Management company with primary commitment in making
          small/large business more profitable for business men and women, as we
          provide professional and flexible service to our streams of customers
          both in Nigeria and outside the country
        </Text>
        <View
          style={{
            flex: 0.5,
            marginTop: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={logo}
            resizeMode={"contain"}
            style={{
              width: "50%",
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://www.stoque.app/")}
        style={styles.readmore}
      >
        <Text style={styles.readmoreText}>READ MORE</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={16}
          color={cxlxrs.black}
        />
      </TouchableOpacity>
    </>
  );
};

export default About;
