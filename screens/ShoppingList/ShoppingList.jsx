import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import { cxlxrs } from "../../constants/Colors";
import { firestore } from "../../firebase/config";
import ShoppingListPreview from "../../components/ShoppingListPreview/ShoppingListPreview";

import { styles } from "./styles";

const ShoppingList = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [hasShoppingList, setHasShoppingList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const shoppingListRef = firestore
    .collection("shopping_list")
    .doc(`${user.id}`)
    .collection("shopping_list");
  const onRefresh = () => {
    setTimeout(() => {
      getCashiers();
    }, 1000);
  };
  const getShoppingList = async () => {
    setIsLoading(true);

    await shoppingListRef.onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        setHasShoppingList(true);
        let newShoppingList = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          newShoppingList.push(snapshot.docs[i].data());
        }
        setShoppingList(newShoppingList);
      }
    });
    setIsLoading(false);
  };
  useEffect(() => {
    getShoppingList();
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
          ({shoppingList.length}) Shopping List
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={cxlxrs.black}
          style={{ marginBottom: 10 }}
        />
      ) : hasShoppingList ? (
        <>
          {/* <View style={styles.overview}>
            <View style={styles.overviewMainTextsContainer}>
              <View>
                <Text style={styles.overviewMainTextLabel}>Total</Text>
                <Text style={styles.overviewMainTextBold}>
                  {shoppingList.length}
                </Text>
              </View>
            </View>
          </View> */}
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.listContainer}>
              <FlatList
                data={shoppingList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ShoppingListPreview data={item} />}
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
              />
            </View>
          </SafeAreaView>
        </>
      ) : (
        <View style={styles.noData}>
          <Text style={[styles.noDataText, styles.noCashierText]}>
            You currently have no list.
          </Text>
        </View>
      )}
    </>
  );
};

export default ShoppingList;
