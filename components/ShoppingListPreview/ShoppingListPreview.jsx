import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { styles } from "./styles";

export default function ShoppingListPreview({
  data,
  data: {
    product_name,
    product_sold_since_last_restock,
    quantity,
    notification,
  },
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
                borderColor:
                  notification < quantity
                    ? cxlxrs.success
                    : quantity === 0
                    ? cxlxrs.danger
                    : cxlxrs.warn,
                // backgroundColor:
                //   status === "In Stock" ? cxlxrs.success : cxlxrs.textColor,
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
              <Text style={styles.cardInfoSubText}>
                Sold: {product_sold_since_last_restock}
              </Text>
              <Text style={styles.cardInfoSubText}>
                {notification < quantity
                  ? `In Stock: ${quantity}`
                  : quantity === 0
                  ? `Sold Out`
                  : `Running Low`}
              </Text>
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
