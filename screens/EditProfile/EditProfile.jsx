import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import EditProfileInputGroup from "../../components/EditProfileInputGroup/EditProfileInputGroup";
import CustomPopUp from "../../components/CustomPopUp/CustomPopUp";
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const EditProfile = () => {
  const user = useSelector((state) => state.user.currentUser);

  const navigation = useNavigation();

  const [image, setImage] = useState(user.profile_pic);
  const [profilePic, setProfilePic] = useState(user.profile_pic);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [location, setLocation] = useState(user.location || "");
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    !user.location && getLocationAsync();
  }, [""]);

  async function getLocationAsync() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync(location.coords);
    const addressObj = address[0];
    setLocation(`${addressObj.city}, ${addressObj.country}`);
    addressObj.country.toLowerCase() === "nigeria"
      ? setLocation(
          `${addressObj.city}, ${addressObj.region} State, ${addressObj.country}`
        )
      : setLocation(`${addressObj.city}, ${addressObj.country}`);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      const uri = result.uri;
    }
  };
  const handleSave = async () => {
    setLoading(true);
    const incomingData = {
      username: username.toLowerCase(),
      name,
      profile_pic: profilePic,
      location,
      website,
      bio,
      headline,
      gender: selectedGender,
    };

    const success = true;
    setLoading(false);
    success && navigation.navigate("ProfileScreen");
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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              borderColor: "#006eff",
              borderWidth: 2,
            }}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={{ color: "#006eff", fontSize: 16, marginTop: 10 }}>
              Upload Image
            </Text>
          </TouchableOpacity>
        </View>
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
          label={"Location"}
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
