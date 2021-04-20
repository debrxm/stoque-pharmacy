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
export const CreateProduct = async (data, ownerId) => {
  const { id } = data;
  const productRef = firestore.doc(`products/${ownerId}/products/${id}`);
  try {
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
  const { userId, subExpireDate, subExpireTimestamp } = data;
  const userRef = firestore.doc(`users/${userId}`);
  try {
    await userRef.update({
      hasSubcribedBefore: true,
      isSubscribed: true,
      subExpireDate,
      subExpireTimestamp,
    });
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
