import { firestore } from "../firebase/config";

export const GenerateRandomNDigits = (n) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

const date = new Date(),
  year = date.getFullYear(),
  month = date.getMonth();

export const firstDayOfTheMonth = Date.parse(
  new Date(year, month, 1).toLocaleString()
);

const first = date.getDate() - date.getDay();
const last = first + 6;

export const firstDayOfTheWeek = Date.parse(
  new Date(date.setDate(first)).toLocaleString()
);

export const lastDayOfTheWeek = Date.parse(
  new Date(date.setDate(last)).toLocaleString()
);
export const TransferBarcode = async (barcode, ownerId) => {
  const barcodeRef = firestore
    .collection("barcode")
    .doc(ownerId)
    .collection("codes")
    .doc("line_one");
  console.log(barcode, ownerId);
  await barcodeRef.set({ barcode });
};

export const Wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
