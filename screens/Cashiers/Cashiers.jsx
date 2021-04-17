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
import AppButton from "../../components/AppButton/AppButton";
import { cxlxrs } from "../../constants/Colors";

import { styles } from "./styles";

const Cashiers = () => {
  let onEndReachedCalledDuringMomentum = false;
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [hasCashier, setHasCashier] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cashiers, setCashiers] = useState([]);
  const cashiersRef = firestore
    .collection("cashiers")
    .doc(`${user.shopId}`)
    .collection("cashiers");
  const onRefresh = () => {
    setTimeout(() => {
      getCashiers();
    }, 1000);
  };
  const getCashiers = async () => {
    setIsLoading(true);

    await cashiersRef.onSnapshot((snapshot) => {
      if (!snapshot.empty) {
        setHasCashier(true);
        let newCashiers = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          newCashiers.push(snapshot.docs[i].data());
        }
        setCashiers(newCashiers);
      }
    });
    setIsLoading(false);
  };
  useEffect(() => {
    getCashiers();
  }, [""]);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.routeTitle}>Cashiers</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}></View>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={cxlxrs.black}
          style={{ marginBottom: 10 }}
        />
      ) : hasCashier ? (
        <>
          <View style={styles.overview}>
            <View style={styles.overviewMainTextsContainer}>
              <View>
                <Text style={styles.overviewMainTextLabel}>Total</Text>
                <Text style={styles.overviewMainTextBold}>
                  {cashiers.length}
                </Text>
              </View>
            </View>
          </View>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.listContainer}>
              <FlatList
                data={cashiers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.name}</Text>}
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
        <View style={styles.noCashier}>
          <Text style={[styles.noDataText, styles.noCashierText]}>
            You currently have no cashier.
          </Text>
          <AppButton
            onPress={() => navigation.navigate("AddCashier")}
            title="Add Cashier"
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
        <TouchableOpacity onPress={() => navigation.navigate("AddCashier")}>
          <View style={styles.button}>
            <Ionicons name="add" size={24} color={cxlxrs.white} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Cashiers;
