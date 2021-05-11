import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import AppButton from "../../components/AppButton/AppButton";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import { cxlxrs } from "../../constants/Colors";
// import { v4 as uuidv4 } from "uuid";
import { styles } from "./styles";
import { useSelector } from "react-redux";

const InvoiceView = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params.data;
  const [amount, setAmount] = useState(data.amountRecived || "0");
  const [balance, setBalance] = useState(data.balance);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [basket, setBasket] = useState(data.products);
  const [total, setTotal] = useState({
    quantity: data.quantity,
    price: data.price,
  });

  useEffect(() => {}, [""]);
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.routeTitle}>Invoices</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>#{data.id}</Text>
      </View>
      <View style={styles.shopInfo}>
        <Text style={styles.shopName}>{user.shopName}</Text>
        <View>
          <Text style={styles.infoLightText}>Address: {user.shopAddress}</Text>
          <Text style={styles.infoLightText}>Tel: {user.phone}</Text>
        </View>
      </View>
      <View style={styles.invoiceInfo}>
        <TouchableOpacity>
          <View style={styles.infoName}>
            <Text style={styles.infoLightText}>Date Of Issue</Text>
            <Text style={styles.infoBoldText}>{data.day_created}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.infoId}>
            <Text style={styles.infoLightText}>Cashier Name</Text>
            <Text style={styles.infoBoldText}>{data.cashier_name}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          {errorMessage !== "" ? (
            <CustomPopUp
              message={`${errorMessage}`}
              type={"error"}
              customStyles={{
                backgroundColor: "red",
                borderRadius: 30,
                justifyContent: "center",
              }}
              customTextStyles={{ color: "#ffffff" }}
            />
          ) : null}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableHead]}>
            <View style={[styles.tableRow]}>
              <Text
                style={[
                  styles.tableText,
                  styles.tableTextLong,
                  styles.tableHeadText,
                  styles.tableHeadTextName,
                ]}
              >
                Item
              </Text>
              <Text style={[styles.tableText, styles.tableHeadText]}>
                Quantity
              </Text>
              <Text style={[styles.tableText, styles.tableHeadText]}>
                Price
              </Text>
            </View>
          </View>
          <View style={[styles.tableBody]}>
            {basket.map((item, index) => (
              <View key={index} style={[styles.tableRow]}>
                <Text
                  style={[
                    styles.tableText,
                    styles.tableTextLong,
                    styles.tableBodyText,
                    styles.tableBodyTextName,
                  ]}
                >
                  {item.product_name || "Maltina"}
                </Text>
                <Text style={[styles.tableText, styles.tableBodyText]}>
                  ₦{item.price} x {item.quantity}
                </Text>
                <Text style={[styles.tableText, styles.tableBodyText]}>
                  ₦{item.total}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ height: 10 }}></View>

          <View style={[styles.tableFooter]}>
            <View style={[styles.tableRow]}>
              <Text
                style={[
                  styles.tableText,
                  styles.tableTextLong,
                  styles.tableFooterText,
                  styles.tableFooterTextName,
                ]}
              >
                Total
              </Text>
              <Text style={[styles.tableText, styles.tableFooterText]}>
                {total.quantity} {total.quantity > 1 ? "products" : "product"}
              </Text>
              <Text
                style={[styles.tableText, styles.tableFooterText]}
              >{`₦${total.price}`}</Text>
            </View>
          </View>
          <View style={[styles.tableFooter, styles.tableSubFooter]}>
            <View style={[styles.tableRow]}>
              <Text
                style={[
                  styles.tableText,
                  styles.tableTextLong,
                  styles.tableFooterText,
                  styles.tableFooterTextName,
                ]}
              >
                Amount Recived
              </Text>
              <Text style={[styles.tableText, styles.tableFooterText]}></Text>
              <Text
                style={[styles.tableText, styles.tableFooterText]}
              >{`₦${amount}`}</Text>
            </View>
          </View>
          <View style={[styles.tableFooter, styles.tableSubFooter]}>
            <View style={[styles.tableRow]}>
              <Text
                style={[
                  styles.tableText,
                  styles.tableTextLong,
                  styles.tableFooterText,
                  styles.tableFooterTextName,
                ]}
              >
                Balance
              </Text>
              <Text style={[styles.tableText, styles.tableFooterText]}></Text>
              <Text
                style={[styles.tableText, styles.tableFooterText]}
              >{`₦${balance}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomButtonsContainer}>
          <View style={styles.bottomButtons}></View>
        </View>
      </ScrollView>
      <View style={{ ...styles.buttonContainer }}>
        <TouchableOpacity onPress={() => {}}>
          <View
            style={[
              styles.button,
              { backgroundColor: cxlxrs.black, marginBottom: 10 },
            ]}
          >
            <Entypo name="print" size={24} color={cxlxrs.white} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default InvoiceView;
