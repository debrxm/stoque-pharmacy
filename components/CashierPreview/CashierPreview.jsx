import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Linking, View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { cxlxrs } from "../../constants/Colors";
import { UnArchiveCashier } from "../../firebase/auth";
import { styles } from "./styles";

export default function CashierPreview({
  data,
  data: { name, phone, address },
  customStyles,
  unArchive,
}) {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();

  const onPress = () => {
    !unArchive && navigation.navigate("CashierView", { data });
  };
  const UnArchive = () => {
    UnArchiveCashier(data, user.shopId);
  };
  return (
    <TouchableOpacity activeOpacity={unArchive ? 1 : 0.6} onPress={onPress}>
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
          {unArchive ? (
            <TouchableOpacity style={styles.iconContainer} onPress={UnArchive}>
              <MaterialIcons name="unarchive" size={28} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => Linking.openURL(`tel://${phone}`)}>
              <Feather
                name="phone"
                size={24}
                color={cxlxrs.black}
                style={{ marginLeft: "auto", marginRight: 5 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </>
    </TouchableOpacity>
  );
}
