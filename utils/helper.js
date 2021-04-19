import { firestore } from "../firebase/config";

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
