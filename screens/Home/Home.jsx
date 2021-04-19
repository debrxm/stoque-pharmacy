import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Graph from "../../components/Graph/Graph";
import OverviewBox from "../../components/OverviewBox/OverviewBox";
import TransactionPreview from "../../components/TransactionPreview/TransactionPreview";
import { cxlxrs } from "../../constants/Colors";
import { firestore } from "../../firebase/config";
import { styles } from "./styles";

const Home = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const [filter, setFilter] = useState("thisWeek");
  const [productCount, setProductCount] = useState("0");
  const [cashierCount, setCashierCount] = useState("0");
  const [latestSale, setLatestSale] = useState([]);
  const [revenue, setRevenue] = useState("0");
  const [isTransactionLoading, setIsTransactionLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isCashierLoading, setIsCashierLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const productsRef = firestore
    .collection("products")
    .doc(user.id)
    .collection("products");
  const cashiersRef = firestore
    .collection("cashiers")
    .doc(`${user.shopId}`)
    .collection("cashiers");
  const statsRef = firestore.collection("stats").doc(user.id);
  const latestSalesRef = firestore
    .collection("sales")
    .doc(user.id)
    .collection("sales");
  const fetchData = async () => {
    productsRef.onSnapshot((snapShot) => {
      setProductCount(snapShot.size);
      setIsProductLoading(false);
    });

    cashiersRef.onSnapshot((snapShot) => {
      setCashierCount(snapShot.size);
      setIsCashierLoading(false);
    });

    statsRef.onSnapshot((snapShot) => {
      if (!snapShot.exists) {
        setIsStatsLoading(false);
        return;
      }
      setRevenue(snapShot.data().revenue);
      setIsStatsLoading(false);
    });
    latestSalesRef
      .orderBy("created_at", "desc")
      .limit(3)
      .onSnapshot((snapShot) => {
        const salesArr = [];
        if (!snapShot.empty) {
          const size = snapShot.docs.length - 1;
          snapShot.docs.forEach((item, index) => {
            salesArr.push(item.data());
            if (index === size) {
              setLatestSale(salesArr);
              setIsTransactionLoading(false);
            }
          });
          return;
        }
        setIsTransactionLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [""]);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <View style={styles.noty}>
            <Ionicons name="notifications" size={24} color={cxlxrs.black} />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>
          {" "}
          Hi,{" "}
          <Text
            style={{
              color: cxlxrs.black,
            }}
          >
            {user.firstName || "Ibrahim"}
          </Text>
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <View style={styles.imageContainer}>
              <FontAwesome name="user" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.overviews}>
          <OverviewBox
            label="Products"
            count={
              isProductLoading ? (
                <ActivityIndicator
                  size="small"
                  color={cxlxrs.white}
                  style={{ marginBottom: 10 }}
                />
              ) : (
                productCount
              )
            }
            onPress={() => navigation.navigate("Products")}
            icon={
              <MaterialIcons name="inventory" size={20} color={cxlxrs.white} />
            }
            bgColor={cxlxrs.black}
            textColor={cxlxrs.white}
          />
          <OverviewBox
            label="Cashiers"
            count={
              isCashierLoading ? (
                <ActivityIndicator
                  size="small"
                  color={cxlxrs.black}
                  style={{ marginBottom: 10 }}
                />
              ) : (
                cashierCount
              )
            }
            onPress={() => navigation.navigate("Cashiers")}
            icon={<FontAwesome5 name="users" size={20} color={cxlxrs.black} />}
            bgColor={cxlxrs.white}
            textColor={cxlxrs.black}
          />
          <OverviewBox
            label="Revenue"
            count={
              isStatsLoading ? (
                <ActivityIndicator
                  size="small"
                  color={cxlxrs.white}
                  style={{ marginBottom: 10 }}
                />
              ) : (
                `₦${revenue}`
              )
            }
            onPress={() => {}}
            icon={<FontAwesome5 name="coins" size={20} color={cxlxrs.white} />}
            bgColor={cxlxrs.black}
            textColor={cxlxrs.white}
          />
        </View>
        <Graph filter={filter} setFilter={setFilter} title="Orders" />
        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={styles.sectionTitle}>Latest Transactions</Text>
          </View>
          {isTransactionLoading ? (
            <ActivityIndicator
              size="large"
              color={cxlxrs.black}
              style={{ marginBottom: 10 }}
            />
          ) : (
            <View style={styles.listContainer}>
              <FlatList
                data={latestSale}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <>
                    {index === 0 ? <View style={{ height: 20 }}></View> : null}
                    <TransactionPreview key={index} data={item} />
                  </>
                )}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                style={{ height: 3 * 60, paddingBottom: 20 }}
                initialNumToRender={3}
                onEndReachedThreshold={0.1}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default Home;
