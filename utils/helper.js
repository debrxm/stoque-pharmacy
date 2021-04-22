import { firestore } from "../firebase/config";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export async function SchedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}
export async function ScheduleReportPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Report Ready !!!",
      body: "View todays sales report",
      data: { data: "" },
    },
    trigger: { repeats: true, hour: 21, minute: 12 },
  });
}

export async function RegisterForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export const SendNotification = (pushNotificationData) => {
  const { body, token, title } = pushNotificationData;
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channelId: pushNotificationData.channelId || "defalt",
      to: token,
      sound: "default",
      title,
      body,
    }),
  });
};

export const GenerateRandomNDigits = (n) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

const date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth();

export const FirstDayOfTheMonth = () =>
  Date.parse(new Date(year, month, 1).toUTCString());

const first = date.getDate() - date.getDay();
const last = first + 6;

export const FirstDayOfTheWeek = () =>
  Date.parse(new Date(date.setDate(first)).toUTCString());

export const LastDayOfTheWeek = () =>
  Date.parse(new Date(date.setDate(last)).toUTCString());
export const BeginingOfTheDay = () => {
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const timestamp = startOfDay / 1000;
  return timestamp;
};
export const TransferBarcode = async (barcode, ownerId) => {
  const barcodeRef = firestore
    .collection("barcode")
    .doc(ownerId)
    .collection("codes")
    .doc("line_one");
  console.log(barcode, ownerId);
  await barcodeRef.set({ barcode });
};
export const BatchWrite = async (productsArr, shopData, ownerId) => {
  const batch = firestore.batch();
  productsArr.forEach((item) => {
    const allProductRef = firestore.doc(`all_products/${item.id}`);
    batch.set(allProductRef, {
      ...item,
      shopId: shopData.shopId,
      ownerId,
      shopData,
    });
  });
  try {
    await batch.commit();
    console.log("Done");
  } catch (error) {
    console.log(
      "An error occured while trying to delete cashier",
      error.message
    );
  }
};

export function Nextweek() {
  var today = new Date();
  var nextweek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return nextweek;
}
export function Yesterday() {
  const date = new Date();
  return date.setDate(date.getDate() - 1);
}
export const StartOfToday = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  const timeString = +d;
  return timeString;
};
export const Wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const GetExpirationDate = (duration) => {
  const date = new Date();
  const month = date.getMonth();
  date.setMonth(date.getMonth() + duration);

  if (date.getMonth() == month) date.setDate(0);
  date.setHours(0, 0, 0, 0);

  return {
    subExpireDate: new Date(date).toISOString().substring(0, 10),
    subExpireTimestamp: new Date(date).getTime(),
  };
};
export function TimeDifference(date1, date2) {
  let difference = date1.getTime() - date2.getTime();

  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;
  return {
    days: daysDifference,
    hours: hoursDifference,
  };
}
