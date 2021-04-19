import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, Share, Text, TouchableOpacity } from "react-native";
import HelperDialog from "../../components/HelperDialog/HelperDialog";
import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";
import SettingsItemWrapper from "../../components/SettingsItemWrapper/SettingsItemWrapper";
import { setCurrentUser } from "../../redux/user/actions";
import { auth } from "../../firebase/config";
import { Wait } from "../../utils/helper";

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
  const onShare = async () => {
    const uri = "../../assets/logos/logo.png";

    Share.share(
      {
        title: "BoundlessInvestment",
        url: uri,
        message: `Hey there, I'm investing with BoundlessInvestment. Join me! Download it here:https://www.boundlessservicesng.com`,
      },
      {
        excludedActivityTypes: [
          // 'com.apple.UIKit.activity.PostToWeibo',
          "com.apple.UIKit.activity.Print",
          // "com.apple.UIKit.activity.CopyToPasteboard",
          // 'com.apple.UIKit.activity.AssignToContact',
          "com.apple.UIKit.activity.SaveToCameraRoll",
          "com.apple.UIKit.activity.AddToReadingList",
          // 'com.apple.UIKit.activity.PostToFlickr',
          // 'com.apple.UIKit.activity.PostToVimeo',
          // 'com.apple.UIKit.activity.PostToTencentWeibo',
          "com.apple.UIKit.activity.AirDrop",
          "com.apple.UIKit.activity.OpenInIBooks",
          "com.apple.UIKit.activity.MarkupAsPDF",
          "com.apple.reminders.RemindersEditorExtension",
          // 'com.apple.mobilenotes.SharingExtension',
          // 'com.apple.mobileslideshow.StreamShareService',
          // 'com.linkedin.LinkedIn.ShareExtension',
          // 'pinterest.ShareExtension',
          // 'com.google.GooglePlus.ShareExtension',
          // 'com.tumblr.tumblr.Share-With-Tumblr',
          // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
        ],
      }
    );
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
        <View style={styles.settings}>
          <SettingsItemWrapper
            title={"About Stoque"}
            icon={
              <AntDesign name="infocirlceo" size={20} color={cxlxrs.black} />
            }
            onPress={() => navigation.navigate("About")}
          />
          {user.isProfileSetupCompleted ? (
            <SettingsItemWrapper
              title={"Shop Info"}
              icon={<AntDesign name="isv" size={20} color={cxlxrs.black} />}
              onPress={() => navigation.navigate("ShopInfo")}
            />
          ) : null}
          <SettingsItemWrapper
            title={"Share the app"}
            icon={<Feather name="share-2" size={20} color={cxlxrs.black} />}
            onPress={onShare}
          />
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
