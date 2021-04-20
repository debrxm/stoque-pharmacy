import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Linking, View, Text, TouchableOpacity } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { styles } from "./styles";

export default function CashierPreview({
  data,
  data: { name, phone, address },
  customStyles,
}) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("CashierView", { data });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <>
        <View style={[styles.productCard, { ...customStyles }]}>
          <View style={[styles.productIconContainer]}>
            <FontAwesome name="user" size={23} color={cxlxrs.black} />
          </View>
          <View style={styles.cardInfo}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.cardInfoName}
            >
              {name}
            </Text>
            <View style={styles.cardInfoSub}>
              <Text style={styles.cardInfoSubText}>{address}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(`tel://${phone}`)}>
            <Feather
              name="phone"
              size={24}
              color={cxlxrs.black}
              style={{ marginLeft: "auto", marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>
      </>
    </TouchableOpacity>
  );
}
