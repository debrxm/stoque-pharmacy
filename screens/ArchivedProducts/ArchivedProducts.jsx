import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import { cxlxrs } from "../../constants/Colors";

import { styles } from "./styles";

const ArchivedProducts = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [hasProduct, setHasProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const productsRef = firestore
    .collection("archived_products")
    .doc(`${user.shopId}`)
    .collection("archived_products");
  const onRefresh = () => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  };
  const getProducts = async () => {
    setIsLoading(true);

    await productsRef.onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        setHasProduct(true);
        let newProducts = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          newProducts.push(snapshot.docs[i].data());
        }
        setProducts(newProducts);
      } else {
        setHasProduct(false);
        setProducts([]);
      }
    });
    setIsLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, [""]);

  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 60 }}
            >
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={cxlxrs.black}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>
          ({products.length}) Product{products.length > 1 && s}
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={cxlxrs.black}
          style={{ marginBottom: 10 }}
        />
      ) : hasProduct ? (
        <>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.listContainer}>
              <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ProductPreview data={item} unArchive />
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                  />
                }
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                style={{ paddingBottom: 20 }}
                initialNumToRender={15}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => {
                  onEndReachedCalledDuringMomentum = false;
                }}
              />
            </View>
          </SafeAreaView>
        </>
      ) : (
        <View style={styles.noProduct}>
          <Text style={[styles.noDataText, styles.noProductText]}>
            You currently have no product here.
          </Text>
        </View>
      )}
    </>
  );
};

export default ArchivedProducts;
