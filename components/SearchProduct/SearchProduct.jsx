import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CustomPopUp from "../CustomPopUp/CustomPopUp";
import AddProductInput from "../AddProductInput/AddProductInput";
import ProductPreview from "../ProductPreview/ProductPreview";
import { FontFamily } from "../../constants/Fonts";
const SearchProduct = ({ searchVisible, setSearchVisible }) => {
  const user = useSelector(({ user }) => user.currentUser);
  const [searched, setSearched] = useState(false);
  const [query, setQuery] = useState("");
  const [noData, setNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const getProductData = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const productsRef = firestore
      .collection("products")
      .doc(user.id)
      .collection("products")
      .where("query", ">=", `${query.toLowerCase()}`)
      .orderBy("query", "asc")
      .limit(5);
    const snapshot = await productsRef.get();
    if (snapshot.empty) {
      setNoData(true);
      setIsLoading(false);
      setSearched(true);
      return;
    }
    const products = [];
    snapshot.docs.forEach((item) => {
      products.push(item.data());
    });
    setProductData(products);
    setSearched(true);
    setIsLoading(false);
  };
  // useEffect(() => {
  //   getProductData();
  // }, [""]);
  return (
    <Modal
      animationType="fade"
      transparent={false}
      statusBarTranslucent={true}
      visible={searchVisible}
      onRequestClose={() => {}}
    >
      <View
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
          backgroundColor: cxlxrs.white,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={[
            {
              position: "absolute",
              top: 20,
              right: 10,
              backgroundColor: cxlxrs.white,
              zIndex: 10,
              height: 40,
              width: 40,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={() => setSearchVisible(false)}
        >
          <Ionicons name="close" size={20} color={cxlxrs.danger} />
        </TouchableOpacity>
        <View style={{ width: "100%", alignItems: "center" }}>
          {errorMessage !== "" ? (
            <CustomPopUp
              message={`${errorMessage}`}
              type={"error"}
              customStyles={{
                backgroundColor: cxlxrs.danger,
                borderRadius: 30,
                justifyContent: "center",
                height: 30,
                paddingVertical: 0,
                marginTop: -140,
              }}
              customTextStyles={{ color: "#ffffff", textAlign: "center" }}
            />
          ) : null}
        </View>
        <View style={[styles.flexGrouping, { marginBottom: "auto" }]}>
          <AddProductInput
            label="Search"
            value={query}
            onChangeText={(e) => {
              setNoData(false);
              setErrorMessage("");
              setQuery(e);
              getProductData();
            }}
            keyType="default"
            containerStyle={{
              width: "85%",
            }}
          />
          <TouchableOpacity
            onPress={getProductData}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              borderRadius: 30,
              backgroundColor: cxlxrs.black,
              height: 40,
            }}
          >
            <Ionicons name="search" size={20} color={cxlxrs.white} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={cxlxrs.black}
            style={{ marginBottom: 10 }}
          />
        ) : noData ? (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.listContainer}>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: FontFamily.FiraMedium,
                  paddingTop: 50,
                }}
              >
                Product doesn't exist in inventory
              </Text>
            </View>
          </SafeAreaView>
        ) : (
          <>
            <SafeAreaView style={{ flex: 1 }}>
              <View style={styles.listContainer}>
                <FlatList
                  data={productData}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <ProductPreview data={item} />}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  style={{ paddingBottom: 20 }}
                  initialNumToRender={15}
                  onEndReachedThreshold={0.1}
                />
              </View>
            </SafeAreaView>
          </>
        )}
      </View>
    </Modal>
  );
};

export default SearchProduct;
