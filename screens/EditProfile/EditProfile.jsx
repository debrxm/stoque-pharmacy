import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import EditProfileInputGroup from "../../components/EditProfileInputGroup/EditProfileInputGroup";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
const EditProfile = () => {
  const user = useSelector((state) => state.user.currentUser);

  const navigation = useNavigation();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [""]);

  const handleSave = async () => {
    setLoading(true);
    const incomingData = {
      name,
      profile_pic: profilePic,
      location,
      website,
    };

    const success = true;
    setLoading(false);
    success && navigation.goBack();
  };
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={20} color="black" />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => handleSave()}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <EditProfileInputGroup
          label={"Full name"}
          handleChange={setName}
          value={name}
        />
        <EditProfileInputGroup
          label={"Email"}
          handleChange={setEmail}
          value={email}
        />
        <EditProfileInputGroup
          label={"Phone"}
          handleChange={setPhone}
          value={phone}
        />
        <EditProfileInputGroup
          label={"Address"}
          handleChange={setLocation}
          value={location}
        />
        <View
          style={{
            position: "absolute",
            bottom: 60,
            width: "100%",
            alignItems: "center",
          }}
        >
          {errorMessage.trim() !== "" ? (
            <CustomPopUp
              message={`${errorMessage}`}
              type={"error"}
              customStyles={{
                backgroundColor: "red",
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
              customTextStyles={{ color: "#ffffff", textAlign: "center" }}
            />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
};

export default EditProfile;
