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
  const { name, storeName, address, ownerId, branchCode, id } = data;
  const employeeRef = firestore.doc(`employees/${ownerId}/cashiers/${id}`);
  const employeeData = {
    id,
    storeName,
    storeId: ownerId,
    branchCode,
    name,
    address,
  };
  try {
    await employeeRef.set(employeeData);
  } catch (error) {
    console.log("error creating shop", error.message);
  }
};
