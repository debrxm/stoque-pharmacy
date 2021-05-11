import { SendNotification } from "../utils/helper";
import { firestore } from "./config";

export const CreateCategory = async (data) => {
  const { category, id, ownerId } = data;
  console.log(data);
  const categoryRef = firestore.doc(
    `categories/${ownerId}/categories/${category.toLowerCase()}`
  );
  const categoryData = {
    id,
    label: category,
  };
  try {
    await categoryRef.set(categoryData);
  } catch (error) {
    console.log("error creating category", error.message);
  }
};
export const CreateProduct = async (data, shopData, ownerId) => {
  const batch = firestore.batch();
  const { id } = data;
  const productRef = firestore.doc(`products/${ownerId}/products/${id}`);
  const allProductRef = firestore.doc(`all_products/${id}`);
  batch.set(productRef, data).set(allProductRef, {
    ...data,
    shopId: shopData.shopId,
    ownerId,
    shopData,
  });
  try {
    await batch.commit();
    await productRef.set(data);
  } catch (error) {
    console.log("error creating category", error.message);
  }
};
export const CreateEmployee = async (data) => {
  const { id, shopId } = data;
  const employeeRef = firestore.doc(`cashiers/${shopId}/cashiers/${id}`);
  try {
    await employeeRef.set(data);
  } catch (error) {
    console.log("error creating shop", error.message);
  }
};
export const onAddSubscription = async (data) => {
  const { userId, subExpireDate, subExpireTimestamp, token } = data;
  const message = `Subscription will expire on ${subExpireDate}`;
  const userRef = firestore.doc(`users/${userId}`);
  try {
    await userRef.update({
      hasSubcribedBefore: true,
      isSubscribed: true,
      subExpireDate,
      subExpireTimestamp,
    });
    UpdateNotification(
      userId,
      { title: data.message, message },
      { token, channelId: "license", title: data.message, body: message }
    );
  } catch (error) {
    console.log("error creating shop", error.message);
  }
};

export const OnArchiveProduct = async (data, ownerId, navigation) => {
  const batch = firestore.batch();
  const { id } = data;
  const productRef = firestore.doc(`products/${ownerId}/products/${id}`);
  const allProductRef = firestore.doc(`all_products/${id}`);
  const archiveRef = firestore.doc(
    `archived_products/${ownerId}/archived_products/${id}`
  );
  batch
    .set(archiveRef, data)
    .delete(productRef)
    .delete(allProductRef);
  try {
    await batch.commit();
    navigation.goBack();
  } catch (error) {
    console.log(
      "An error occured while trying to archive product",
      error.message
    );
  }
};
export const UnArchiveProduct = async (data, ownerId) => {
  const batch = firestore.batch();
  const { id } = data;
  const productRef = firestore.doc(`products/${ownerId}/products/${id}`);
  const allProductRef = firestore.doc(`all_products/${id}`);
  const archiveRef = firestore.doc(
    `archived_products/${ownerId}/archived_products/${id}`
  );
  batch
    .set(productRef, data)
    .set(allProductRef, data)
    .delete(archiveRef);
  try {
    await batch.commit();
  } catch (error) {
    console.log(
      "An error occured while trying to archive product",
      error.message
    );
  }
};
export const OnDeleteProduct = async (id, ownerId) => {
  const batch = firestore.batch();
  const productRef = firestore.doc(`products/${ownerId}/products/${id}`);
  const allProductRef = firestore.doc(`all_products/${id}`);
  batch.delete(allProductRef).delete(productRef);
  try {
    await batch.commit();
  } catch (error) {
    console.log(
      "An error occured while trying to delete cashier",
      error.message
    );
  }
};

export const UpdateNotification = (
  ownerId,
  notificationData,
  pushNotificationData
) => {
  const notificationRef = firestore
    .collection("notifications")
    .doc(ownerId)
    .collection("notifications")
    .doc();
  try {
    notificationRef.set({
      ...notificationData,
      created_at: Date.now(),
      viewed: false,
    });
    SendNotification(pushNotificationData);
  } catch (error) {
    console.log(error);
  }
};
