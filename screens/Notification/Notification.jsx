import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { cxlxrs } from "../../constants/Colors";
import { firestore } from "../../firebase/config";
import NotificationPreview from "../../components/NotificationPreview/NotificationPreview";

import { styles } from "./styles";
import { useSelector } from "react-redux";

const Notification = () => {
  let onEndReachedCalledDuringMomentum = false;
  const user = useSelector(({ user }) => user.currentUser);
  const navigation = useNavigation();
  const [hasNotification, setHasNotification] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

  const notificationRef = firestore
    .collection("notifications")
    .doc(user.id)
    .collection("notifications")
    .orderBy("created_at", "desc");
  const getNotifications = async () => {
    setIsLoading(true);
    notificationRef.limit(20).onSnapshot((snapShot) => {
      if (!snapShot.empty) {
        setHasNotification(true);
        let newNotifications = [];
        setLastDoc(snapShot.docs[snapShot.docs.length - 1]);
        for (let i = 0; i < snapShot.docs.length; i++) {
          newNotifications.push(snapShot.docs[i].data());
        }
        setNotifications(newNotifications);
      } else {
        setLastDoc(null);
      }
    });
    setIsLoading(false);
  };

  const getMore = async () => {
    if (lastDoc) {
      setIsMoreLoading(true);
      notificationRef
        .orderBy("created_at")
        .startAfter(lastDoc.data().created_at)
        .limit(10)
        .onSnapshot((snapShot) => {
          if (!snapShot.empty) {
            let newNotifications = notifications;

            setLastDoc(snapShot.docs[snapShot.docs.length - 1]);

            for (let i = 0; i < snapShot.docs.length; i++) {
              newNotifications.push(snapShot.docs[i].data());
            }

            setNotifications(newNotifications);
            if (snapShot.docs.length < 10) setLastDoc(null);
          } else {
            setLastDoc(null);
          }
        });
      setIsMoreLoading(false);
    }

    onEndReachedCalledDuringMomentum = true;
  };

  useEffect(() => {
    getNotifications();
  }, [""]);
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 60 }}
            >
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={cxlxrs.black}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>Notifications</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={cxlxrs.black}
          style={{ marginBottom: 10 }}
        />
      ) : hasNotification ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.listContainer}>
            <FlatList
              data={notifications}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <NotificationPreview
                  data={item}
                  customStyles={
                    index === notifications.length - 1 && { marginBottom: 60 }
                  }
                />
              )}
              ListFooterComponent={
                <RenderFooter isMoreLoading={isMoreLoading} />
              }
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
              }
              contentContainerStyle={{
                flexGrow: 1,
              }}
              style={{ paddingBottom: 20 }}
              initialNumToRender={10}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => {
                onEndReachedCalledDuringMomentum = false;
              }}
              onEndReached={() => {
                if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
                  getMore();
                }
              }}
            />
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.noProduct}>
          <Text style={[styles.noDataText, styles.noProductText]}>
            You currently have no notification.
          </Text>
        </View>
      )}
    </>
  );
};

function RenderFooter({ isMoreLoading }) {
  if (!isMoreLoading) return true;

  return (
    <ActivityIndicator
      size="large"
      color={cxlxrs.black}
      style={{ marginBottom: 10 }}
    />
  );
}

export default Notification;
