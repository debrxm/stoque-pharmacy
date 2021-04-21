import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function NotificationPreview({
  data,
  data: { title, message, created_at },
}) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  !item.viewed && onView();

  async function onView() {
    await firestore
      .collection("activity_feed")
      .doc(user.id)
      .collection("feedItems")
      .doc(item.id)
      .update({ viewed: true });
    dispatch(toggleHasNoty(false));
  }
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        width: "100%",
        marginVertical: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 80,
          width: "100%",
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingHorizontal: 20,
          backgroundColor: !item.viewed ? "#006eff22" : "white",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {title}
            <Text style={{ fontWeight: "400", fontSize: 14 }}>{message}</Text>
          </Text>
          <Text style={{ color: "gray" }}>{moment(created_at).fromNow()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
