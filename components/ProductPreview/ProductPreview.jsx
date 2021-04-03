import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { styles } from "./styles";

export default function ProductPreview({
  data,
  data: { product_name, product_sold_since_last_restock, status, quantity },
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
                  status === "In Stock" ? cxlxrs.success : cxlxrs.textColor,
                // backgroundColor:
                //   status === "In Stock" ? cxlxrs.success : cxlxrs.textColor,
              },
            ]}
          >
            <MaterialIcons name="inventory" size={23} color={cxlxrs.white} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoName}>{product_name}</Text>
            <View style={styles.cardInfoSub}>
              <Text style={styles.cardInfoSubText}>
                Sold: {product_sold_since_last_restock}
              </Text>
              <Text style={styles.cardInfoSubText}>
                {status === "In Stock" ? `In Stock: ${quantity}` : `Sold Out`}
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
