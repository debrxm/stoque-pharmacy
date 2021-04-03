import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AddProductInput from "../../components/AddProductInput/AddProductInput";
import AppButton from "../../components/AppButton/AppButton";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
import { firestore } from "../../firebase/config";

import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";

const AddCategory = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {}, []);
  const onCreateCategory = async (categoryRef, categoryData) => {
    try {
      await categoryRef.doc(categoryData.value).set(categoryData);
      setCategory("");
      setLoading(false);
    } catch (error) {
      setErrorMessage(`An error occured, please try again!`);
      setLoading(false);
    }
  };
  async function checkIfCategoryExist() {
    setLoading(true);
    const value = category.toLowerCase();
    if (category.trim() === "") {
      setLoading(false);
      setErrorMessage(`Enter category!`);
      return;
    }

    const categoryRef = firestore
      .collection("categories")
      .doc(user.id)
      .collection("categories");
    const snapshot = await categoryRef.where("value", "==", `${value}`).get();
    if (snapshot.size) {
      snapshot.setErrorMessage("Category already existed");
      setLoading(false);
      return;
    }

    const categoryData = {
      value,
      label: category,
      created_at: Date.now(),
    };
    onCreateCategory(categoryRef, categoryData);
  }
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 90 }}
            >
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>Add Category</Text>
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
        <AddProductInput
          label="Category Name"
          value={category}
          onChangeText={(e) => {
            setErrorMessage("");
            setCategory(e);
          }}
          autoCapitalize="words"
        />
        <View style={{ height: 20 }}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            position: "absolute",
            bottom: 20,
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color={cxlxrs.black}
              style={{ marginBottom: 10 }}
            />
          ) : (
            <AppButton
              onPress={() => !loading && checkIfCategoryExist()}
              title="Add"
              customStyle={styles.addBtn}
              textStyle={styles.addBtnText}
            />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default AddCategory;
