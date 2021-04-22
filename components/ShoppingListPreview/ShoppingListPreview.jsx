import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { styles } from "./styles";

export default function ShoppingListPreview({
  data,
  data: { product_name, in_hand, status },
  customStyles,
}) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ProductView", { data });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <>
        <View style={[styles.productCard, { ...customStyles }]}>
          <View
            style={[
              styles.productIconContainer,
              {
                borderColor: status === "danger" ? cxlxrs.danger : cxlxrs.warn,
              },
            ]}
          >
            <MaterialIcons name="inventory" size={23} color={cxlxrs.white} />
          </View>
          <View style={styles.cardInfo}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.cardInfoName}
            >
              {product_name}
            </Text>
            <View style={styles.cardInfoSub}>
              <Text style={styles.cardInfoSubText}>In Hand {in_hand}</Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={24}
            color={cxlxrs.black}
            style={{ marginLeft: "auto", marginRight: 5 }}
          />
        </View>
      </>
    </TouchableOpacity>
  );
}
