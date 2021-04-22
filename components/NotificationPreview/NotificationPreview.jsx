import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { cxlxrs } from "../../constants/Colors";
import { firestore } from "../../firebase/config";
import { toggleHasNoty } from "../../redux/user/actions";
import { styles } from "./styles";

export default function NotificationPreview({
  data,
  data: { id, title, message, created_at, viewed },
}) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    !viewed && onView();
  }, [""]);

  async function onView() {
    await firestore
      .collection("notifications")
      .doc(user.id)
      .collection("notifications")
      .doc(id)
      .update({ viewed: true });
    dispatch(toggleHasNoty(false));
  }
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        width: "100%",
        marginVertical: 5,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: viewed ? "#ffffff" : cxlxrs.black,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...styles.boldText,
              color: viewed ? cxlxrs.black : "#ffffff",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              ...styles.lightText,
              color: viewed ? cxlxrs.textColor : cxlxrs.white,
            }}
          >
            {message}
          </Text>
          <Text
            style={{
              ...styles.time,
              color: viewed ? cxlxrs.textColor : cxlxrs.white,
            }}
          >
            {moment(created_at).fromNow()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
