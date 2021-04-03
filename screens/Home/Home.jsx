import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Graph from "../../components/Graph/Graph";
import OverviewBox from "../../components/OverviewBox/OverviewBox";
import { cxlxrs } from "../../constants/Colors";
import { firestore } from "../../firebase/config";
import { styles } from "./styles";

const Home = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const [isTipHidden, hideTip] = useState(false);
  const [filter, setFilter] = useState("thisWeek");
  const [productCount, setProductCount] = useState("0");
  const [cashierCount, setCashierCount] = useState("0");
  const [revenue, setRevenue] = useState("0");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const productsRef = firestore
    .collection("products")
    .doc(user.id)
    .collection("products");
  const cashiersRef = firestore
    .collection("employees")
    .doc(user.id)
    .collection("cashiers");
  const statsRef = firestore.collection("stats").doc(user.id);
  const fetchData = async () => {
    productsRef.onSnapshot((snapShot) => setProductCount(snapShot.size));
    cashiersRef.onSnapshot((snapShot) => setCashierCount(snapShot.size));
    statsRef.onSnapshot((snapShot) => {
      if (!snapShot.exists) {
        return;
      }
      setRevenue(snapShot.data().revenue);
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
              {/* <Image style={styles.profilePic} source={avatar} /> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.overviews}>
          <OverviewBox
            label="Products"
            count={productCount}
            onPress={() => navigation.navigate("Products")}
            icon={
              <MaterialIcons name="inventory" size={20} color={cxlxrs.white} />
            }
            bgColor={cxlxrs.black}
            textColor={cxlxrs.white}
          />
          <OverviewBox
            label="Cashiers"
            count={cashierCount}
            onPress={() => navigation.navigate("Cashiers")}
            icon={<FontAwesome5 name="users" size={20} color={cxlxrs.black} />}
            bgColor={cxlxrs.white}
            textColor={cxlxrs.black}
          />
          <OverviewBox
            label="Revenue"
            count={`₦${revenue}`}
            onPress={() => {}}
            icon={<FontAwesome5 name="coins" size={20} color={cxlxrs.white} />}
            bgColor={cxlxrs.black}
            textColor={cxlxrs.white}
          />
        </View>
        <ScrollView>
          <Graph
            filter={filter}
            setFilter={setFilter}
            title="Orders"
            monthOrderCount={20}
          />
          <View style={styles.section}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={styles.sectionTitle}>Latest Transaction</Text>
            </View>
            <TouchableWithoutFeedback>
              <View style={styles.transaction}>
                <View style={styles.transactionIcon}></View>
                <View style={styles.transactionTexts}>
                  <View style={styles.transactionTextLeft}>
                    <Text style={styles.transactionName}>
                      Product sold by Emily
                    </Text>
                    <View style={styles.transactionSubtext}>
                      <Text style={styles.transactionTime}>10 min ago</Text>
                      <Text style={styles.transactionProductCount}>
                        21 Products
                      </Text>
                    </View>
                  </View>
                  <View style={styles.transactionTextRight}>
                    <Text style={styles.transactionId}>10ingo</Text>
                    <Text
                      style={styles.transactionTotalPrice}
                    >{`₦${"32,000"}`}</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
