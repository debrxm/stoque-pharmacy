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
  const categoryRef = firestore.doc(`products/${ownerId}/products/${id}`);
  try {
    await categoryRef.set(data);
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
