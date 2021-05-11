import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { toggleHasNoty } from "../../redux/user/actions";
import { styles } from "./styles";
import { cxlxrs } from "../../constants/Colors";
import AppButton from "../AppButton/AppButton";
const NotificationViewer = ({
  notyVisible,
  setNotyVisible,
  data: { id, title, message, created_at, viewed },
}) => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {}, [""]);
  async function onView() {
    await firestore
      .collection("notifications")
      .doc(user.id)
      .collection("notifications")
      .doc(id)
      .update({ viewed: true });
  }
  return (
    <Modal
      animationType="slide"
      transparent={false}
      statusBarTranslucent={false}
      visible={notyVisible}
      onRequestClose={() => {}}
      onShow={!viewed && onView}
    >
      <View
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
          backgroundColor: cxlxrs.white,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={[
            {
              position: "absolute",
              top: 20,
              right: 10,
              backgroundColor: cxlxrs.white,
              zIndex: 10,
              height: 40,
              width: 40,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={() => setNotyVisible(false)}
        >
          <Ionicons name="close" size={20} color={cxlxrs.danger} />
        </TouchableOpacity>
        <View
          style={{
            ...styles.container,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.icon}>
              <Feather name="bell" size={24} color={cxlxrs.white} />
            </View>
            <Text style={styles.boldText}>{title}</Text>
            <Text style={styles.lightText}>{message}</Text>
            <Text style={styles.time}>{moment(created_at).fromNow()}</Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <AppButton
              onPress={() => setNotyVisible(false)}
              title={" Okay, Got it"}
              customStyle={styles.okBtn}
              textStyle={styles.okBtnText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationViewer;
