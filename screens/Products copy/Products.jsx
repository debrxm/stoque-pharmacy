import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import AppButton from "../../components/AppButton/AppButton";
import HelperDialog from "../../components/HelperDialog/HelperDialog";
import ProductPreview from "../../components/ProductPreview/ProductPreview";
import Scanner from "../../components/Scanner/Scanner";
import { cxlxrs } from "../../constants/Colors";
import { firestore } from "../../firebase/config";

import { styles } from "./styles";

const Products = () => {
  let onEndReachedCalledDuringMomentum = false;
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [hasProduct, setHasProduct] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [products, setProducts] = useState([]);
  const productsRef = firestore
    .collection("products")
    .doc(user.id)
    .collection("products");
  const onRefresh = () => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  };
  const getProducts = async () => {
    setIsLoading(true);

    const snapshot = await productsRef
      .orderBy("created_at")
      .limit(15)
      .get();

    if (!snapshot.empty) {
      setHasProduct(true);
      let newProducts = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newProducts.push(snapshot.docs[i].data());
      }

      setProducts(newProducts);
    } else {
      setLastDoc(null);
    }

    setIsLoading(false);
  };

  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await productsRef
          .orderBy("created_at")
          .startAfter(lastDoc.data().id)
          .limit(15)
          .get();

        if (!snapshot.empty) {
          let newProducts = products;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newProducts.push(snapshot.docs[i].data());
          }

          setProducts(newProducts);
          if (snapshot.docs.length < 15) setLastDoc(null);
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 1000);
    }

    onEndReachedCalledDuringMomentum = true;
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.routeTitle}>Inventory</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => setScannerVisible(true)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                width: 40,
              }}
            >
              <MaterialCommunityIcons
                name="barcode-scan"
                size={18}
                color={cxlxrs.textColor}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                width: 40,
              }}
            >
              <Feather name="search" size={18} color={cxlxrs.textColor} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Scanner
        scannerVisible={scannerVisible}
        setScannerVisible={setScannerVisible}
        quickScan
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={cxlxrs.black}
          style={{ marginBottom: 10 }}
        />
      ) : hasProduct ? (
        <>
          <View style={styles.overview}>
            <View style={styles.overviewMainTextsContainer}>
              <Text style={styles.overviewMainTextLabel}>Total</Text>
              <Text style={styles.overviewMainTextBold}>{products.length}</Text>
            </View>
            <View style={styles.navButtons}>
              <AppButton
                onPress={() => navigation.navigate("TopUp")}
                title="All"
                customStyle={styles.navBtn}
                textStyle={{ ...styles.navBtnText, color: cxlxrs.black }}
              />
              <AppButton
                onPress={() => navigation.navigate("Products")}
                title="Running Low"
                customStyle={{
                  ...styles.navBtn,
                  backgroundColor: cxlxrs.white,
                }}
                textStyle={{
                  ...styles.navBtnText,
                }}
              />
              <AppButton
                onPress={() => navigation.navigate("Products")}
                title="Sold Out"
                customStyle={{
                  ...styles.navBtn,
                  backgroundColor: cxlxrs.white,
                }}
                textStyle={{
                  ...styles.navBtnText,
                }}
              />
            </View>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ProductPreview data={item} />}
              ListFooterComponent={
                <RenderFooter isMoreLoading={isMoreLoading} />
              }
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              contentContainerStyle={{ flex: 1 }}
              style={{ height: "100%" }}
              initialNumToRender={15}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => {
                onEndReachedCalledDuringMomentum = false;
              }}
              onEndReached={() => {
                if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                  getMore();
                }
              }}
            />
          </View>
        </>
      ) : (
        <View style={styles.noProduct}>
          <Text style={[styles.noDataText, styles.noProductText]}>
            You currently have no product.
          </Text>
          <AppButton
            onPress={() => navigation.navigate("AddProduct")}
            title="Add Product"
            customStyle={{
              backgroundColor: cxlxrs.white,
              borderRadius: 30,
              height: 35,
              width: "40%",
            }}
            textStyle={{
              fontFamily: "FiraCode-Regular",
              textTransform: "capitalize",
              fontWeight: "400",
              fontSize: 12,
              color: cxlxrs.black,
            }}
          />
        </View>
      )}
      <View style={{ ...styles.buttonContainer }}>
        <TouchableOpacity onPress={() => navigation.navigate("AddCategory")}>
          <View
            style={[
              styles.button,
              { backgroundColor: "#ffffff", marginBottom: 10 },
            ]}
          >
            <MaterialIcons name="category" size={24} color={cxlxrs.black} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AddProduct")}>
          <View style={styles.button}>
            <Ionicons name="add" size={24} color={cxlxrs.white} />
          </View>
        </TouchableOpacity>
      </View>
      <HelperDialog
        visible={dialogVisible}
        setDialogVisible={setDialogVisible}
        noTitle
      >
        <AppButton
          onPress={() => navigation.navigate("AddCategory")}
          title="Add Category"
          customStyle={{
            backgroundColor: "#ffffff",
            borderRadius: 30,
            height: 35,
            width: "90%",
          }}
          textStyle={{
            fontFamily: "FiraCode-Regular",
            textTransform: "capitalize",
            fontWeight: "400",
            fontSize: 12,
            color: cxlxrs.black,
          }}
        />
        <AppButton
          onPress={() => navigation.navigate("AddProduct")}
          title="Add Product"
          customStyle={{
            backgroundColor: cxlxrs.black,
            borderRadius: 30,
            height: 35,
            width: "y0%",
          }}
          textStyle={{
            fontFamily: "FiraCode-Regular",
            textTransform: "capitalize",
            fontWeight: "400",
            fontSize: 12,
            color: cxlxrs.white,
          }}
        />
      </HelperDialog>
    </>
  );
};

function RenderFooter({ isMoreLoading }) {
  if (!isMoreLoading) return true;

  return (
    <ActivityIndicator
      size="large"
      color={cxlxrs.black}
      style={{ marginBottom: 10 }}
    />
  );
}

export default Products;
