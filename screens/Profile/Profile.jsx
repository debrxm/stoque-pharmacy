import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import HelperDialog from "../../components/HelperDialog/HelperDialog";
import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";
import SettingsItemWrapper from "../../components/SettingsItemWrapper/SettingsItemWrapper";
import { setCurrentUser } from "../../redux/user/actions";
import { auth } from "../../firebase/config";
import { Wait } from "../../utils/helper";
import AppButton from "../../components/AppButton/AppButton";

const Profile = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const [dialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {}, [""]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSignout = () => {
    setDialogVisible(false);
    Wait(2000).then(() => {
      auth.signOut();
      dispatch(setCurrentUser(null));
    });
  };

  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 60 }}
            >
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>Profile</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: 60,
          }}
        >
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setDialogVisible(true)}
          >
            <Feather name="more-vertical" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <HelperDialog
        visible={dialogVisible}
        setDialogVisible={setDialogVisible}
        title={"More"}
      >
        <TouchableOpacity
          style={[styles.modalTextButton]}
          onPress={() => {
            setDialogVisible(false);
          }}
        >
          <AntDesign
            name="edit"
            size={20}
            color="black"
            style={{ marginRight: 20 }}
          />
          <Text style={[styles.modalText]}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalTextButton]}
          onPress={handleSignout}
        >
          <Feather
            name="log-out"
            size={20}
            color="red"
            style={{ marginRight: 20 }}
          />
          <Text style={[styles.modalText, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </HelperDialog>
      <View style={styles.container}>
        <View style={styles.userPreview}>
          <View style={styles.userImageContainer}>
            <FontAwesome name="user" size={60} color={cxlxrs.black} />
          </View>
          <View style={styles.usernameContainer}>
            <Text style={styles.adminText}>Admin</Text>
            <Text style={styles.username}>
              {user.firstName || `Ibrahim`} {user.lastName || ``}
            </Text>
          </View>
        </View>
        {user.isProfileSetupCompleted ? (
          <View style={styles.info}>
            <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
              <View style={styles.infoName}>
                <Text style={styles.infoLightText}>Shop Name</Text>
                <Text style={styles.infoBoldText}>{user.shopName}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Bonus")}>
              <View style={styles.infoId}>
                <Text style={styles.infoLightText}>Shop Code</Text>
                <Text style={styles.infoBoldText}>{user.shopId}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.archiveButtons}>
          <AppButton
            onPress={() => navigation.navigate("ArchivedCashiers")}
            title={"Archived Cashiers"}
            customStyle={{
              ...styles.addBtn,
              backgroundColor: cxlxrs.black,
            }}
            textStyle={styles.addBtnText}
          />
          <AppButton
            onPress={() => navigation.navigate("ArchivedProducts")}
            title="Archived Products"
            customStyle={{
              ...styles.addBtn,
              backgroundColor: cxlxrs.textColor,
            }}
            textStyle={styles.addBtnText}
          />
        </View>
        <View style={styles.settings}>
          <SettingsItemWrapper
            title={"About Stoque"}
            icon={
              <AntDesign name="infocirlceo" size={20} color={cxlxrs.black} />
            }
            onPress={() => navigation.navigate("About")}
          />
          <SettingsItemWrapper
            title={"Shopping List"}
            icon={<Feather name="list" size={20} color={cxlxrs.black} />}
            onPress={() => navigation.navigate("ShoppingList")}
          />
          {user.isProfileSetupCompleted ? (
            <SettingsItemWrapper
              title={"Shop Info"}
              icon={<AntDesign name="isv" size={20} color={cxlxrs.black} />}
              onPress={() => navigation.navigate("ShopInfo")}
            />
          ) : null}
          {user.isProfileSetupCompleted ? (
            <SettingsItemWrapper
              title={"License"}
              icon={
                <MaterialCommunityIcons
                  name="license"
                  size={20}
                  color={cxlxrs.black}
                />
              }
              onPress={() => navigation.navigate("License")}
            />
          ) : null}
        </View>
        {!user.isProfileSetupCompleted ? (
          <View style={styles.completeSetup}>
            <View style={styles.icon}>
              <Ionicons name="warning" size={26} color={cxlxrs.warn} />
            </View>
            <View style={styles.completeSetupTexts}>
              <Text style={styles.completeSetupTextMain}>Attention Needed</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.completeSetupTextSub}>
                  Complete shop setup{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CompleteSetup")}
                >
                  <Text style={styles.completeSetupTextBold}>{"Tap Here"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default Profile;
